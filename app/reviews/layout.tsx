import { SkeletonTheme } from 'react-loading-skeleton';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SkeletonTheme baseColor="#D1D5DB" highlightColor="#D1D5DB">
      {children}
    </SkeletonTheme>
  );
}
