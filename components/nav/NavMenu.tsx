'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: '모임 찾기', href: '/' },
  { name: '찜한 모임', href: '/saved-gatherings' },
  { name: '모든 리뷰', href: '/reviews' },
];

const isSelected = (currentPathname: string, href: string) => currentPathname === href;

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <span className={isSelected(pathname, link.href) ? 'text-gray-900' : ''}>
            {link.name}
          </span>
        </Link>
      ))}
    </>
  );
}
