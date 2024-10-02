import Head from '/public/icons/head.svg';

import ProgressCardList from '@/components/progressCard/ProgressCardList';
import CommonFilterSection from './_components/CommonFilterSection';
import { fetchGatherings } from '@/lib/data';

const HomePage = async () => {
  const { data: gatherings, errorMessage } = await fetchGatherings();

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!gatherings) {
    return <p>데이터가 존재하지 않습니다.</p>;
  }

  return (
    <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 pb-12pxr max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pb-45pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-4">
          <Head />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-left text-gray-700">
              함께 할 사람이 없나요?
            </span>
            <span className="text-lg font-semibold text-gray-900 md:text-2xl">
              지금 모임에 참여해보세요
            </span>
          </div>
        </div>
        <CommonFilterSection />
        <ProgressCardList gatherings={gatherings} />
      </div>
    </div>
  );
};

export default HomePage;
