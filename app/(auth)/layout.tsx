import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full items-start justify-center bg-gray-50 pt-8">
      <div className="w-343pxr flex flex-col items-center">
        <div className="flex flex-col gap-2 text-gray-800">
          <h2 className="text-xl font-semibold">Welcome to 같이 달램!</h2>
          <p className="text-center text-sm font-medium">
            바쁜 일상 속 잠깐의 휴식,
            <br />
            이제는 같이 달램과 함께 해보세요.
          </p>
        </div>
        <Image src="/auth.png" width={290} height={240} alt="Login logo" />
        <div className="w-full px-4 py-8 bg-white rounded-3xl">{children}</div>
      </div>
    </div>
  );
}
