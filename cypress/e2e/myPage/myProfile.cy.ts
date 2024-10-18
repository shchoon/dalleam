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

    cy.get('svg[aria-label="closeBtn"]').click();

    // click cancelBtn
    cy.get('svg[aria-label="edit"]').click();

    cy.get('form').find('button').contains('취소').click();
  });

  it.only('should sumbit modified profile', () => {
    cy.get('svg[aria-label="edit"]').click();

    cy.fixture('test.png', 'base64').then((fileContent) => {
      cy.get('input[aria-label="profileImg"]').attachFile({
        fileContent,
        filePath: 'test.png',
        mimeType: 'image/png',
      });
    });

    cy.get('#companyName').type('5sense');

    cy.get('form').find('button').contains('수정하기').click();
  });
});
