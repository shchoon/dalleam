// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

const USER_ID = Cypress.env('userId');
const PASSWORD = Cypress.env('password');
const API_BASE_URL = Cypress.env('apiBaseUrl');

beforeEach(() => {
  const currentTestPath = Cypress.spec.relative; // 현재 실행 중인 스펙 파일 경로

  if (currentTestPath.includes('myPage')) {
    cy.fixture('myPage/login.json').then((data) => {
      cy.intercept('POST', `${API_BASE_URL}/auths/signin`, (req) => {
        req.reply({
          statusCode: 200,
          body: [data],
        });
      }).as('login');
    });

    cy.fixture('myPage/user.json').then((data) => {
      cy.intercept('GET', `${API_BASE_URL}/auths/user`, (req) => {
        req.reply({
          statusCode: 200,
          body: [data],
        });
      }).as('getUser');
    });

    // myPage 폴더에서만 beforeEach 적용
    cy.visit('/login'); // 또는 다른 공통 작업

    cy.get('input[type="email"]').type(USER_ID);

    cy.get('input[type="password"]').type(PASSWORD);

    cy.get('button').contains('로그인').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('nav').find('button').click();
    cy.contains('마이페이지').click();
    cy.url().should('include', 'my-page');
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
