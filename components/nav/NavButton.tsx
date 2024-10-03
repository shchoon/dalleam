'use client';

import Link from 'next/link';
import Dropdown from '../Dropdown';
import Profile from '../profile/Profile';
import useUserStore from '@/stores/userStore';
import useDropdown from '@/hooks/useDropDown';
import Cookies from 'js-cookie';

const logout = () => {
  document.cookie = 'token=; Max-Age=0; path=/';
  useUserStore.getState().clearUser();
  window.location.reload();
};

export default function NavButton() {
  const { dropdownRef, handleOpenDropdown } = useDropdown();
  const { user, hydrated } = useUserStore();
  const token = Cookies.get('token');

  if (!hydrated) return null;
  return token ? (
    <>
      <button onClick={handleOpenDropdown}>
        <Profile image={user?.image} usedIn="navbar" />
      </button>
      <Dropdown ref={dropdownRef} ulClassName="top-27pxr md:top-29pxr right-10pxr">
        <Link href="/my-page">마이페이지</Link>
        <button onClick={logout}>로그아웃</button>
      </Dropdown>
    </>
  ) : (
    <Link href="/login">로그인</Link>
  );
}
