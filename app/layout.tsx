import QueryProvider from '@/components/QueryProvider';
import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} relative`}>
        <div className="flex flex-col w-full">
          <div className="w-full text-3xl text-center bg-orange-600 h-56pxr md:h-60pxr">
            네비게이션 들어가는 곳
          </div>
          <QueryProvider>
            <div className="bg-gray-100 flex items-center flex-col">{children}</div>
          </QueryProvider>
        </div>
        <div id="global-modal"></div>
      </body>
    </html>
  );
}
