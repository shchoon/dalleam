export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full h-screen bg-black bg-opacity-30 ">{children}</div>;
}
