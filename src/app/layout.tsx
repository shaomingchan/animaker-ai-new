import { cookies } from "next/headers";

export const metadata = {
  title: "Animaker.AI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Test if async cookies() is the culprit
  let initialLang = "en";
  try {
    const cookieStore = await cookies();
    initialLang = cookieStore.toString().includes("lang=zh") ? "zh" : "en";
  } catch {
    initialLang = "en";
  }

  return (
    <html lang={initialLang}>
      <body>{children}</body>
    </html>
  );
}
