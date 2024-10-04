import NavButton from './NavButton';
import NavMenu from './NavMenu';

export default function NavBar() {
  return (
    <div className="w-full h-56pxr md:h-60pxr border-b-2 border-black bg-orange-600 text-center text-orange-50 font-semibold text-sm md:text-base">
      <nav className="flex justify-between items-center h-full px-4 md:px-6 max-w-1248pxr mx-auto">
        <div className="flex items-center h-full gap-3 md:gap-20pxr">
          <h1 className="text-[13.41px] md:text-[16.852px] font-tmoney font-extrabold w-56pxr h-27pxr md:w-73pxr md:h-35pxr box-border pl-[2px] md:pl-[4px] pr-[1.91px] md:pr- pt-[3.65px] pb-[5.82px]">
            같이달램
          </h1>
          <div className="flex gap-3 md:gap-6">
            <NavMenu />
          </div>
        </div>
        <div className="flex items-center">
          <NavButton />
        </div>
      </nav>
    </div>
  );
}
