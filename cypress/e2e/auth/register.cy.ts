describe('회원가입 e2e test', () => {
  beforeEach(() => {
    // 회원가입 페이지로 이동
    cy.visit('/register');
  });

  it('속성이 비어있을 때', () => {
    // 각 필드의 에러 메시지 확인
    cy.get('input[name="name"]')
      .should('have.value', '')
      .and('have.attr', 'placeholder', '이름을 입력해 주세요.');
    cy.get('input[name="email"]')
      .should('have.value', '')
      .and('have.attr', 'placeholder', '이메일을 입력해 주세요.');
    cy.get('input[name="companyName"]')
      .should('have.value', '')
      .and('have.attr', 'placeholder', '회사명을 입력해 주세요.');
    cy.get('input[name="password"]')
      .should('have.value', '')
      .and('have.attr', 'placeholder', '비밀번호를 입력해 주세요.');
    cy.get('input[name="passwordCheck"]')
      .should('have.value', '')
      .and('have.attr', 'placeholder', '비밀번호를 다시 한 번 입력해 주세요.');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('유효하지 않은 포맷 입력', () => {
    // 유효하지 않은 이메일 입력
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="companyName"]').type('Test Company');
    cy.get('input[name="password"]').type('1234');
    cy.get('input[name="passwordCheck"]').type('123');
    cy.contains('올바른 이메일 형식이 아닙니다.').should('be.visible');
    cy.contains('비밀번호는 8자 이상이어야 합니다.').should('be.visible');
    cy.contains('비밀번호가 일치하지 않습니다.').should('be.visible');
    cy.get('input[name="password"]').type('12345678');
    cy.contains('비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('회원가입 성공', () => {
    cy.intercept(
      'POST',
      'https://fe-adv-project-together-dallaem.vercel.app/FESI3-3/auths/signup',
      {
        statusCode: 200,
        body: {
          message: '회원가입에 성공하였습니다.',
        },
      },
    ).as('register');

    // 유효한 데이터를 입력
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="companyName"]').type('Test Company');
    cy.get('input[name="password"]').type('validPassword123');
    cy.get('input[name="passwordCheck"]').type('validPassword123');

    // 회원가입 시도
    cy.get('button[type="submit"]').click();

    // 목업된 응답 확인
    cy.wait('@register').its('response.statusCode').should('eq', 200);

    // 로그인 페이지로 리다이렉트되는지 확인
    cy.url().should('include', '/login');
    cy.contains('회원가입에 성공하였습니다.').should('be.visible');
  });
});
