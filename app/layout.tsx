import QueryProvider from '@/components/QueryProvider';
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
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <div className="flex flex-col w-[100vw] h-[100vh]">
          <div className="w-full h-56pxr md:h-60pxr bg-orange-600 text-center text-3xl">
            네비게이션 들어가는 곳
          </div>
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
