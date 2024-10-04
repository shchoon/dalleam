import { DropdownHandles } from '@/components/Dropdown';
import { useRef } from 'react';

function useDropdown() {
  const dropdownRef = useRef<DropdownHandles>(null);

  const handleOpenDropdown = () => {
    dropdownRef.current?.open();
  };

  const handleCloseDropdown = () => {
    dropdownRef.current?.close();
  };

  const handleToggleDropdown = () => {
    dropdownRef.current?.toggle();
  };

  return {
    dropdownRef,
    handleOpenDropdown,
    handleCloseDropdown,
    handleToggleDropdown,
  };
}

export default useDropdown;
