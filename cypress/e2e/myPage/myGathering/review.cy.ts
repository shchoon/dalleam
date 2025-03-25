describe('test review in myGathering', () => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');

  beforeEach('나의 모임 예약 취소 버튼 생성', () => {
    cy.fixture('myPage/getGathering.json').then((data) => {
      cy.intercept('GET', `${API_BASE_URL}/gatherings/joined*`, (req) => {
        req.reply({
          statusCode: 200,
          body: new Array(1).fill(data),
        });
      }).as('review');
    });

    cy.fixture('myPage/postReview.json').then((data) => {
      cy.intercept('POST', `${API_BASE_URL}/reviews`, (req) => {
        req.reply({
          statusCode: 201,
          body: data,
        });
      }).as('addReview');
    });
  });

  it('should close reviewModal when deleteIcon and cancelBtn ard clicked', () => {
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 10);
    cy.scrollTo('bottom', { duration: 1000 });

    cy.wait('@review');

    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 11);

    // click deleteIcon
    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('리뷰 작성하기').click();
    cy.get('svg[aria-label="deleteIcon"]').click();

    // click cancelBtn
    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('리뷰 작성하기').click();
    cy.get('form').contains('취소').click();
  });

  it('should submit review when submitBtn is clicked', () => {
    cy.get('div[aria-label="gatheringJoined"]').children().should('have.length', 10);
    cy.scrollTo('bottom', { duration: 1000 });

    cy.wait('@review');

    cy.scrollTo('bottom', { duration: 1000 });

    cy.get('div[aria-label="gatheringJoined"]').children().last().contains('리뷰 작성하기').click();
    cy.get('svg[aria-label="emptyHeart"]').then((elements) => {
      for (var i = 0; i < 3; i++) {
        cy.wrap(elements[i]).click();
      }
    });

    cy.get('form')
      .get('textarea')
      .type('남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.');
    cy.get('form').get('button').contains('리뷰 등록').click();
    cy.get('div[aria-label="gatheringJoined"]')
      .children()
      .last()
      .find('button')
      .should('have.class', 'bg-gray-400');

    cy.wait('@addReview');
  });
});
