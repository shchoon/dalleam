describe('DetailPage', () => {
  const USER_ID = Cypress.env('userId');
  const PASSWORD = Cypress.env('password');

  it('로그인 하지 않은 상태에서 모임 목록에서 하트 이모티콘을 클릭해 찜 목록에 추가하고, 로그인 후 찜 목록 페이지에서 해당 목록을 확인하고 다시 제거', () => {
    cy.visit('/');

    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="Gathering List"]').children().eq(i).find('[data-testid="unSaved"]').click();

      cy.get('[data-cy="Gathering List"]')
        .children()
        .eq(i)
        .find('[data-testid="saved"]')
        .should('exist');
    }

    cy.get('a[href="/login"]').click();

    cy.get('input[name="email"]').type(USER_ID);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button').contains('로그인').click();

    cy.wait(2000);
    cy.get('a[href="/saved-gatherings"]').click();

    cy.get('[data-cy="SavedGathering List"]').children().should('have.length', 3);
    cy.get('[data-cy="SavedGathering List"]')
      .children()
      .first()
      .find('[data-testid="saved"]')
      .click();

    cy.get('[data-cy="SavedGathering List"]').children().should('have.length', 2);
  });
});
