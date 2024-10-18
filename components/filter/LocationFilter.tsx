'use client';

import Arrow from '/public/icons/gathering/arrow_down.svg';
import { LocationType } from '@/lib/definition';
import useDropdown from '@/hooks/useDropDown';
import Dropdown from '../Dropdown';
import useFilterStore from '@/stores/filterStore';

const locations: LocationType[] = ['지역 선택', '을지로3가', '건대입구', '신림', '홍대입구'];

const LocationFilter = ({ isReviewPage }: { isReviewPage?: boolean }) => {
  const { dropdownRef, handleToggleDropdown } = useDropdown();
  const { location: currentLocation, setLocation } = useFilterStore();
  const isLocationSelected = currentLocation !== '지역 선택';

  return (
    <div className="relative z-20">
      <div
        className={`flex items-center justify-between h-10 px-3 border-2 border-gray-100 border-solid cursor-pointer w-110pxr py-6pxr rounded-xl ${
          isLocationSelected ? 'bg-gray-900 text-gray-50' : 'bg-white text-gray-800'
        }`}
        onClick={() => handleToggleDropdown()}
      >
        <span className="text-sm font-medium">{currentLocation}</span>
        <Arrow className={`${isLocationSelected ? ' text-gray-50' : ' text-gray-800'}`} />
      </div>
      <Dropdown
        ref={dropdownRef}
        liClassName="border-none hover:bg-orange-100 cursor-pointer rounded-xl w-110pxr p-1"
        ulClassName="top-8pxr md:top-8pxr text-sm font-medium text-gray-800"
      >
        {locations.map((location) => (
          <span key={location} onClick={() => setLocation(location)}>
            {location}
          </span>
        ))}
      </Dropdown>
    </div>
  );
};

export default LocationFilter;
