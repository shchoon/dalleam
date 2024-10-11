describe('test cancel gathering', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  const currentDate = new Date();
  const rigistrationEnd = currentDate.setDate(currentDate.getDate() + 1);
  const dateTime = currentDate.setDate(currentDate.getDate() + 1);

  const createGathering = {
    location: '건대입구',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728540708519_SmartSelectImage_2022-03-22-22-54-04.png',
    type: 'OFFICE_STRETCHING',
    registrationEnd: new Date(rigistrationEnd).toISOString(),
    capacity: 5,
    dateTime: new Date(dateTime).toISOString(),
  };

  before('나의 모임 예약 취소 버튼 생성', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('1234@naver.com');

    cy.get('input[type="password"]').type('00000000');

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.getCookie('token').then((cookie) => {
      if (cookie) {
        // 쿠키가 존재할 경우
        console.log(cookie.value);
        document.cookie = `token=${cookie.value}; path=/; max-age=3600`;
        // 모임 생성
        cy.request({
          method: 'POST',
          url: `${apiBaseUrl}/gatherings`,
          body: createGathering,
          headers: {
            Authorization: `Bearer ${cookie.value}`,
          },
        }).then((res) => {
          const gatheringId = res.body.id;
          // 생성한 모임 참여
          cy.request({
            method: 'POST',
            url: `${apiBaseUrl}/gatherings/${gatheringId}/join`,
            headers: {
              Authorization: `Bearer ${cookie.value}`,
            },
          }).then((res) => {
            res.body.message = '모임에 참여했습니다';
          });
        });
      } else {
        // 쿠키가 존재하지 않을 경우
        console.log('쿠키가 존재하지 않습니다.');
      }
    });
  });

  it('should close cancelModal when deleteIcon and cancelIcon are clicked', () => {
    // 마이페이지 이동
    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
    cy.url().should('include', 'my-page');

    // click deleteIcon
    cy.get('button').contains('예약 취소하기', { matchCase: false }).click();

    cy.get('svg[aria-label="deleteIcon"]').click();

    // click cancelBtn
    cy.get('button').contains('예약 취소하기', { matchCase: false }).click();

    cy.get('button[aria-label="cancelBtn"]').click();
  });

  it('should close cancelModal when cancelBtn is clicked', () => {
    cy.visit('/login');

    cy.get('input[type="email"]').type('1234@naver.com');

    cy.get('input[type="password"]').type('00000000');

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    // 마이페이지 이동
    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
    cy.url().should('include', 'my-page');

    // 예약 취소하기
    cy.get('button').contains('예약 취소하기', { matchCase: false }).click();

    cy.get('button[aria-label="submitBtn"]').click();
  });
});
