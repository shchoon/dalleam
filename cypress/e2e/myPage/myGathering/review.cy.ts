describe('test review in myGathering', () => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');

  const testData = {
    teamId: 'FESI3-3',
    id: 1,
    type: 'OFFICE_STRETCHING',
    name: null,
    dateTime: '2024-09-30T04:36:42.335Z',
    registrationEnd: '2024-09-30T04:36:42.335Z',
    location: '건대입구',
    participantCount: 1,
    capacity: 5,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727670982771_SmartSelectImage_2022-03-22-22-52-45.png',
    createdBy: 681,
    canceledAt: null,
    joinedAt: '2024-09-30T04:36:42.335Z',
    isCompleted: true,
    isReviewed: false,
  };

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

  it.only('should submit review when submitBtn is clicked', () => {
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
