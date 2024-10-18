describe('HomePage', () => {
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');
  beforeEach(() => {
    cy.visit('/');
  });

  it('로그인 하지 않은 상태에서 모임 만들기 버튼 클릭 시 로그인 알림창 표시, 확인 버튼 클릭 후 로그인 페이지로 리다이렉트, 로그인 후 홈페이지로 이동하여 정상적인 모임 만들기 모달 표시', () => {
    cy.get('button').contains('모임 만들기').click();

    cy.contains('로그인이 필요해요').should('be.visible').parent().find('button').click();

    cy.get('input[name="email"]').type(USER_ID);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button').contains('로그인').click();

    cy.url().should('include', '/login');

    cy.wait(500);
    cy.get('[data-cy="loader"]').should('be.visible');
    cy.contains('모임 만들기').should('exist');
  });

  it('로그인 상태에서 모임 만들기 버튼을 클릭하여 모임 생성', () => {
    const targetDate = new Date();
    const targetDay = targetDate.getDate();

    cy.get('a[href="/login"]').click();
    cy.wait(1000); // 페이지 로딩 대기
    cy.get('input[name="email"]').type(USER_ID);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button').contains('로그인').click();

    cy.get('button').contains('모임 만들기').click();
    cy.get('[data-cy="modal"]').should('be.visible'); // 모달 확인

    cy.contains('장소를 선택 해주세요').click({ force: true });
    cy.get('select').select('건대입구', { force: true }).should('have.value', '건대입구');

    // 파일 첨부
    cy.fixture('test.png', 'base64').then((fileContent) => {
      cy.get('[data-cy="file-input"]').attachFile({
        fileContent,
        fileName: 'test.png',
        mimeType: 'image/png',
      });
    });

    // 서비스 선택 및 날짜/시간 설정
    cy.get('[data-cy="service-OFFICE_STRETCHING"]').click();
    cy.get(`.calendar-day.${targetDay}`).click();
    cy.get('div:contains("오후")').next().find('span:contains("18:00")').click();

    cy.get('div:contains("모집정원")').siblings().find('input[name="capacity"]').type('5');

    // 모임 생성 확인 버튼 클릭
    cy.get('button[type="submit"]').click();
  });

  it('초기 10개 데이터 이후 무한 스크롤로 데이터 로드', () => {
    cy.get('[data-cy="Gathering List"]').children().should('have.length', 10);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('[data-cy="loader"]').should('be.visible');
    cy.get('[data-cy="Gathering List"]').children().should('have.length', 20);

    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('[data-cy="loader"]').should('be.visible');
    cy.get('[data-cy="Gathering List"]').children().should('have.length', 30);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('[data-cy="loader"]').should('be.visible');
    cy.get('[data-cy="Gathering List"]').children().should('have.length', 40);
  });

  it('DALLAEMFIT 또는 WORKATION 탭 클릭 시 필터링', () => {
    cy.get('[data-cy="dallaem-fit-filter"]').click();
    cy.wait(1000); // 필터가 적용될 때까지 대기

    cy.get('[data-cy="Gathering List"]')
      .children()
      .each((el) => {
        cy.wrap(el).should((el) => {
          const text = el.text();
          expect(text).to.match(/OFFICE_STRETCHING|MINDFULNESS/);
        });
      });

    cy.get('[data-cy="workation-filter"]').click();
    cy.wait(1000);

    cy.get('[data-cy="Gathering List"]')
      .children()
      .each((el) => {
        cy.wrap(el).should((el) => {
          const text = el.text();
          expect(text).to.include('WORKATION');
        });
      });
  });
});
