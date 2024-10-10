// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(true);
//   });
// });

describe('HomePage', () => {
  beforeEach(() => {
    // 데이터를 미리 준비하거나 API 요청을 스텁하여 설정합니다.
    cy.intercept('GET', '/api/gatherings', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Gathering 1' },
        { id: 2, title: 'Gathering 2' },
      ],
    }).as('fetchGatherings');

    cy.visit('/'); // 홈페이지를 방문합니다.
  });

  it('renders correctly', () => {
    cy.get('h1').contains('지금 모임에 참여해보세요'); // 텍스트 확인
    cy.get('svg').should('exist'); // 아이콘 확인
  });

  it('opens login alert and redirects to login page when "Create Meeting" button is clicked', () => {
    // 모임 만들기 버튼 클릭
    cy.get('button').contains('모임 만들기').click(); // 버튼 클릭

    // 로그인 알림창 확인
    cy.contains('로그인이 필요해요') // 알림창의 텍스트로 확인
      .should('be.visible') // 알림창이 보이는지 확인
      .parent() // 알림창의 부모 요소로 이동
      .find('button') // 확인 버튼 선택
      .click(); // 클릭

    // 로그인 폼 제출 (name 속성을 사용하여 접근)
    cy.get('input[name="email"]').type('04068k@naver.com');
    cy.get('input[name="password"]').type('rlatlahs12');
    cy.get('button').contains('로그인').click();

    // 로그인 페이지로 이동했는지 확인
    cy.url().should('include', '/login'); // 로그인 페이지 URL 확인

    // cy.contains('모임만들기').scrollIntoView().should('be.visible');
  });
});
