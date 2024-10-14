import Menu from './_components/menu';
import MyProfile from '@/components/myProfile/Myprofile';

export default function MyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-6 md:pt-8 w-screen max-w-1200pxr min-h-screen bg-gray-50">
      <div className="w-347pxr md:w-700pxr lg:w-996pxr gap-4 lg:gap-30pxr">
        <MyProfile />
        <div className="flex flex-col px-4 md:px-6 py-6 border-t-2 border-gray-900 bg-white">
          <Menu />
          {children}
        </div>
      </div>
    </div>
  );
}
