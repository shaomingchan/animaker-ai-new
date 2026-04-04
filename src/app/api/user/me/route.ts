import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, tasks as tasksTable } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const user = await db.query.users.findFirst({
    where: sql`${users.id} = ${userId}`,
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userTasks = await db.query.tasks.findMany({
    where: eq(tasksTable.userId, userId),
    orderBy: [desc(tasksTable.createdAt)],
  });

  return NextResponse.json({
    id: user.id,
    email: user.email || 'No email',
    credits: user.credits ?? 0,
    plan: user.plan || 'free',
    tasks: userTasks.map(task => ({
      id: task.id,
      status: task.status || 'queued',
      resolution: task.resolution ?? 540,
      duration: task.duration ?? 14,
      createdAt: task.createdAt?.toISOString() || new Date().toISOString(),
      completedAt: task.completedAt?.toISOString() || null,
    })),
  });
}
