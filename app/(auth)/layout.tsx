import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.75rem)] h- items-start lg:items-center justify-center bg-gray-50 pt-8">
      <div className="w-full flex flex-col items-center justify-center lg:flex-row lg:gap-102pxr">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 text-gray-800 text-center">
            <h2 className="text-xl md:text-2xl font-semibold">Welcome to 같이 달램!</h2>
            <p className="text-sm md:text-base font-medium">
              바쁜 일상 속 잠깐의 휴식,
              <br />
              이제는 같이 달램과 함께 해보세요.
            </p>
          </div>
          <div className="relative w-290pxr h-240pxr py-7pxr md:w-407pxr md:h-337pxr md:py-10pxr lg:w-588pxr lg:h-486pxr lg:py-14pxr">
            <Image src="/auth.png" fill alt="Login logo" />
          </div>
        </div>
        <div className="w-343pxr md:w-608pxr lg:w-510pxr px-4 py-8 md:px-16 md:py-8 bg-white rounded-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
