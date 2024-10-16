export const gatherings = {
  OFFICE_STRETCHING: { val: 'OFFICE_STRETCHING', name: '달램핏:오피스 스트레칭' },
  MINDFULNESS: { val: 'MINDFULNESS', name: '달램핏:마인드풀니스' },
  WORKATION: { val: 'WORKATION', name: '워케이션' },
  DALLAEMFIT: { val: 'DALLAEMFIT', name: '전체' },
} as const;

export const gatheringsMainTab = [gatherings.DALLAEMFIT, gatherings.WORKATION];

export const gatheringsSubTab = [
  gatherings.DALLAEMFIT,
  gatherings.OFFICE_STRETCHING,
  gatherings.MINDFULNESS,
];

export const locations = {
  건대입구: '건대입구',
  을지로3가: '을지로3가',
  신림: '신림',
  홍대입구: '홍대입구',
  '지역 선택': '지역 선택',
} as const;

export const sortTabs = {
  '최신 순': '최신 순',
  '참여 인원 순': '참여 인원 순',
  '리뷰 높은 순': '리뷰 높은 순',
  '마감 임박': '마감 임박',
};
