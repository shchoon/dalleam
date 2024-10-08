export const gatherings = {
  OFFICE_STRETCHING: 'OFFICE_STRETCHING',
  MINDFULNESS: 'MINDFULNESS',
  WORKATION: 'WORKATION',
  DALLAEMFIT: 'DALLAEMFIT',
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
