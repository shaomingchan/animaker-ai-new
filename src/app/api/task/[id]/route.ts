import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { tasks, users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { rhQueryTask, rhDownloadResult } from '@/lib/runninghub';
import { uploadToR2, getPresignedUrl } from '@/lib/r2';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { id: taskId } = await params;

  const task = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, taskId), eq(tasks.userId, userId)),
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: task.id,
    status: task.status,
    resolution: task.resolution,
    duration: task.duration,
    resultUrl: task.resultKey ? await getPresignedUrl(task.resultKey, 3600) : null,
    errorMessage: task.errorMessage,
    createdAt: task.createdAt.toISOString(),
    completedAt: task.completedAt?.toISOString() || null,
  });
}

// Poll RunningHub and update task status
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { id: taskId } = await params;

  const task = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, taskId), eq(tasks.userId, userId)),
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  if (!task.rhTaskId) {
    return NextResponse.json({ error: 'No RunningHub task ID' }, { status: 400 });
  }

  // Already completed
    if (task.status === 'success' || task.status === 'failed') {
      return NextResponse.json({
        id: task.id,
        status: task.status,
        resultUrl: task.resultKey ? await getPresignedUrl(task.resultKey, 3600) : null,
        errorMessage: task.errorMessage,
      });
    }

  try {
    const result = await rhQueryTask(task.rhTaskId);

    if (result.status === 'SUCCESS' && result.results?.[0]?.url) {
      // Download result and store in R2
      const videoBuffer = await rhDownloadResult(result.results[0].url);
      const resultKey = `tasks/${taskId}/result.mp4`;
      await uploadToR2(resultKey, videoBuffer, 'video/mp4');

      // Update database
      await db.update(tasks)
        .set({
          status: 'success',
          resultKey,
          rhCoinsCost: result.usage?.consumeCoins ? parseInt(result.usage.consumeCoins) : null,
          completedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));

      return NextResponse.json({
        id: taskId,
        status: 'success',
        resultUrl: await getPresignedUrl(resultKey, 3600),
      });
    }

    if (result.status === 'FAILED') {
      // NOTE: neon-http driver does not support .transaction(). Sequential ops instead.
      await db.update(tasks)
        .set({
          status: 'failed',
          errorMessage: result.errorMessage || 'Generation failed',
          completedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));

      await db.update(users)
        .set({ credits: sql`${users.credits} + 1` })
        .where(sql`${users.id} = ${userId}`);

      return NextResponse.json({
        id: taskId,
        status: 'failed',
        errorMessage: result.errorMessage || 'Generation failed',
      });
    }

    return NextResponse.json({
      id: taskId,
      status: 'running',
      rhStatus: result.status,
    });
  } catch (error: unknown) {
    console.error('Task query failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
