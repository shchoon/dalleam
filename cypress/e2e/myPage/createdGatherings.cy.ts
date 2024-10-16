describe('test createdGatherings', () => {
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
  });

  it('should work infite scroll', () => {
    cy.get('div').contains('내가 만든 모임').click();

    cy.url().should('include', 'created-gatherings');

    cy.fixture('myPage/getGathering.json').then((data) => {
      cy.intercept('GET', `${API_BASE_URL}/gatherings*`, (req) => {
        req.reply({
          statusCode: 200,
          body: new Array(10).fill(data),
        });
      }).as('firstInfiniteScroll');
    });

    cy.get('div[aria-label="createdGatherings"]').children().should('have.length', 10);

    cy.scrollTo('bottom', { duration: 1000 });

    cy.get('div[aria-label="createdGatherings"]').children().should('have.length', 20);

    cy.fixture('myPage/getGathering.json').then((data) => {
      cy.intercept('GET', `${API_BASE_URL}/gatherings*`, (req) => {
        req.reply({
          statusCode: 200,
          body: new Array(7).fill(data),
        });
      }).as('secondInfiniteScroll');
    });

    cy.scrollTo('bottom', { duration: 1000 });

    cy.get('div[aria-label="createdGatherings"]').children().should('have.length', 27);

    cy.wait('@secondInfiniteScroll');
    cy.scrollTo('bottom', { duration: 1000 });
  });
});
