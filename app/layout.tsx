import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../static/font/Pretendard-Light.otf',
  display: 'swap',
  weight: '100 200 300 400 500 600 700 800 900',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
