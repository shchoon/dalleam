describe('로그인 e2e test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('이메일과 비밀번호가 비어 있을 때 로그인 시도', () => {
    // 버튼 비활성화 확인
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('유효하지 않은 이메일 형식 입력', () => {
    cy.get('input[name="email"]').type('invalid-email');
    // 비밀번호 입력
    cy.get('input[name="password"]').type('validPassword123');
    // 로그인 시도
    cy.get('button[type="submit"]').should('be.disabled');

    // 이메일 형식 에러 메시지 확인
    cy.contains('올바른 이메일 형식이 아닙니다.').should('be.visible');
  });

  it('유효하지 않은 이메일과 비밀번호 입력', () => {
    // 유효하지 않은 이메일과 비밀번호 입력
    cy.get('input[name="email"]').type('invalid.email@example.com');
    cy.get('input[name="password"]').type('wrongPassword123');
    // 로그인 시도
    cy.get('button[type="submit"]').click();

    // 서버에서 응답한 에러 메시지 확인
    cy.contains('잘못된 이메일 또는 비밀번호입니다').should('be.visible'); // 실패 메시지 확인
  });

  it('유효한 이메일 비밀번호 입력', () => {
    // 유효한 이메일 입력
    cy.get('input[name="email"]').type('test1@gmail.com');
    // 유효한 비밀번호 입력
    cy.get('input[name="password"]').type('asdf1234');
    // 로그인 시도
    cy.get('button[type="submit"]').click();

    // 로그인 성공 후 리다이렉트 확인
    cy.url().should('include', '/'); // 리다이렉트 되는 페이지 확인
    cy.contains('로그인에 성공하였습니다.').should('be.visible'); // 성공 메시지 확인
  });
});
