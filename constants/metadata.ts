import { Metadata } from 'next';

export const META = {
  title: '같이달램: 내가 직접 참여하고 만드는 모임 서비스',
  description:
    '바쁜 일상 속 휴식을 위한 다양한 모임에 참여해보세요. 관심있는 다양한 모임을 가입하거나 생성하여 리뷰를 남길 수 있어요.',
  keyword: ['같이달램', '모임 참여', '자기계발', '계획', ''],
  url: 'https://dalleam.vercel.app',
  ogImage: '/card-image2.png',
} as const;

type generateMetadataProps = {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
};

export const getMetadata = (metadataProps?: generateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} ` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath && asPath.trim() !== '' ? asPath : META.url;
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url), // URL 객체 타입 필요
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
