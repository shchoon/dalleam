describe('test new review', () => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(USER_ID);

    cy.get('input[type="password"]').type(PASSWORD);

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
    cy.url().should('include', 'my-page');

    cy.contains('나의 리뷰').click();
    cy.url().should('include', 'my-review');

    cy.fixture('myPage/postReview.json').then((data) => {
      data.id = 1385;
      cy.intercept('POST', `${API_BASE_URL}/reviews`, (req) => {
        req.reply({
          statusCode: 201,
          body: data,
        });
      }).as('addReview');
    });
  });

  it('should close review modal when deleteIcon and cancelBtn are clicked', () => {
    cy.get('div').should('have.text', '10월 13일').find('button').click();
    cy.get('svg[aria-label="deleteIcon"]').click();

    cy.get('div').should('have.text', '10월 13일').find('button').click();
    cy.get('button').contains('취소').click();
  });

  it('should submit post request when submitBtn is clicked', () => {
    cy.get('button').contains('리뷰 작성하기').click();
    cy.get('svg[aria-label="emptyHeart"]').then((elements) => {
      for (var i = 0; i < 3; i++) {
        cy.wrap(elements[i]).click();
      }
    });

    cy.get('textarea').type('남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.');
    cy.get('button').contains('리뷰 등록').click();

    // post 요청 확인
    cy.wait('@addReview');
  });
});
