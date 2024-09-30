import NavButton from './NavButton';
import NavMenu from './NavMenu';
import Image from 'next/image';

export default function NavBar() {
  return (
    <div className="w-full h-56pxr md:h-60pxr border-b-2 border-black bg-orange-600 text-center text-orange-50 font-semibold text-sm md:text-base">
      <nav className="flex justify-between items-center h-full px-4 md:px-6 max-w-1248pxr mx-auto">
        <div className="flex items-center h-full gap-3">
          <Image src="/logo_text.png" width={65} height={22} alt="logo text" priority />
          <div className="flex gap-3">
            <NavMenu />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <NavButton />
        </div>
      </nav>
    </div>
  );
}
