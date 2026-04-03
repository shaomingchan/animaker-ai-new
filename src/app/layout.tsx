export const metadata = {
  title: "Animaker.AI",
  description: "AI Dance Video Generator - Upload Your Own Dance Reference",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
