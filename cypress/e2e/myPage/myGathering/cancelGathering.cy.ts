describe('test cancel gathering in myGathering', () => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');

  const currentDate = new Date();
  const dateTime = currentDate.setDate(currentDate.getDate() + 1);

  beforeEach('나의 모임 예약 취소 버튼 생성', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(USER_ID);

    cy.get('input[type="password"]').type(PASSWORD);

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
    cy.url().should('include', 'my-page');

    cy.fixture('myPage/getGathering.json').then((data) => {
      data.dateTime = new Date(dateTime).toISOString();
      data.registrationEnd = new Date(dateTime).toISOString();

      cy.intercept('GET', `${API_BASE_URL}/gatherings/joined*`, (req) => {
        req.reply({
          statusCode: 200,
          body: [data],
        });
      }).as('cancelGathering');
    });

    cy.intercept('DELETE', `${API_BASE_URL}/gatherings/1/leave*`, (req) => {
      req.reply({
        statusCode: 200,
        body: { message: '모임을 참여 취소했습니다' },
      });
    });
  });

  it('should close cancelModal when deleteIcon and cancelIcon are clicked', () => {
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 10);
    cy.scrollTo('bottom', { duration: 1000 });

    cy.wait('@cancelGathering');
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 12);

    // click deleteIcon
    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('예약 취소하기').click();

    cy.get('svg[aria-label="deleteIcon"]').click();

    // click cancelBtn
    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('예약 취소하기').click();

    cy.get('form').find('button').contains('취소').click();
  });

  it.only('should close cancelModal when cancelBtn is clicked', () => {
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 10);
    cy.scrollTo('bottom', { duration: 1000 });

    cy.intercept('GET', `${API_BASE_URL}/gatherings/joined*`, (req) => {
      req.reply({
        statusCode: 200,
        body: [],
      });
    }).as('cancelGathering');

    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 11);
    cy.wait('@cancelGathering');
    cy.scrollTo('bottom', { duration: 1000 });
    // 예약 취소하기

    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('예약 취소하기').click();
    cy.get('form').find('button').contains('확인').click();
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 10);
  });
});
