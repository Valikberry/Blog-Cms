// app/layout.js
import "./globals.css";

export const metadata = {
  title: "geosnippet admin",
  description: "Manage your posts and categories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
