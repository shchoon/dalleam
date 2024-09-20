import MyProfile from '@/components/myProfile/Myprofile';
import ModifyProfile from '@/components/modal/ModifyProfile';

export default function myPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center py-6 md:py-8">
      <div className="w-347pxr md:w-700pxr lg:w-996pxr">
        <MyProfile />
      </div>
      <ModifyProfile />
    </div>
  );
}
