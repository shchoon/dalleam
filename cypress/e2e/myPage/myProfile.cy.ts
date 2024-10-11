describe('test myProfile', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('1234@naver.com');

    cy.get('input[type="password"]').type('00000000');

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    // 마이페이지 이동
    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
  });

  it('should close modifyModal when deleteIcon and cancelBtn are clicked', () => {
    // click closeProfileEditModal
    cy.get('svg[aria-label="edit"]').click();

    cy.get('svg[aria-label="closeProfileEditModal"]').click();

    // click cancelBtn
    cy.get('svg[aria-label="edit"]').click();

    cy.get('button[aria-label="cancelBtn"]').click();
  });

  it('should sumbit modified profile', () => {
    cy.get('svg[aria-label="edit"]').click();

    cy.get('label[for="profileImg"]').selectFile(
      'C:\\Users\\acckr\\OneDrive\\사진\\스크린샷\\스크린샷 2024-04-11 230427.png',
    );
    cy.get('input[aria-label="companyName"]').type('5sense');

    cy.get('button[aria-label="modifyBtn"]').click();
  });
});
