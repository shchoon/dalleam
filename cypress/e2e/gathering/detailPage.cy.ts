describe('DetailPage', () => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');
  beforeEach(() => {
    cy.fixture('gatherings').then((gatherings) => {
      cy.intercept('GET', `${API_BASE_URL}/gatherings*`, {
        statusCode: 200,
        body: gatherings,
      });
    });

    cy.visit('/');
  });

  it('모임 목록 클릭 시 상세 페이지로 이동', () => {
    cy.get('[data-cy="Gathering List"]').children().first().find('img').click();
    cy.url().should('include', '/gatherings');
  });

  it('상세페이지에서 로그인을 하지 않고 모임 참여하기 버튼을 눌렀을 경우 로그인 알림 버튼을 통해 로그인 페이지에서 로그인 후 다시 상세페이지로 이동', () => {
    cy.get('[data-cy="Gathering List"]').children().first().find('img').click();

    cy.wait(1000);
    cy.get('button').contains('참여하기').click();

    cy.contains('로그인이 필요해요').should('be.visible').parent().find('button').click();
    cy.get('input[name="email"]').type(USER_ID);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button').contains('로그인').click();

    cy.url().should('include', '/gatherings/');
  });

  it('로그인 후 모임 상세페이지에서 "참여하기"와 "참여 취소하기" 기능을 테스트', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type(USER_ID);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button').contains('로그인').click();

    cy.get('[data-cy="Gathering List"]').children().first().find('img').click();

    cy.get('button').then(($btn) => {
      if ($btn.text().includes('참여 취소하기')) {
        cy.get('button').contains('참여 취소하기').click();
        cy.get('button').contains('참여하기').click();
      } else {
        cy.get('button').contains('참여하기').click();
        cy.get('button').contains('참여 취소하기').click();
      }
    });
  });
});
