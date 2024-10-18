import QueryProvider from '@/components/QueryProvider';
import './globals.css';
import localFont from 'next/font/local';
import NavBar from '@/components/nav/NavBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import { getMetadata } from '@/constants/metadata';
import ToastContainer from '@/components/toast/ToastContainer';
import { TokenMonitor } from '@/components/TokenMonitor';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = getMetadata();

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
      <body className={pretendard.className}>
        <div className="flex flex-col w-full relative">
          <NavBar />
          <QueryProvider>
            <div className="bg-gray-100 flex items-center flex-col">{children}</div>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          </QueryProvider>
        </div>
        <div id="global-modal"></div>
        <TokenMonitor />
        <ToastContainer />
        <SpeedInsights />
      </body>
    </html>
  );
}
