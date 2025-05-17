const username = 'Admin';
const password = 'admin123';
// const employeeUsername = 'john.doe';
// const employeePassword = 'Password123!';

const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

// Helper function to login
function login(username, password) {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}
