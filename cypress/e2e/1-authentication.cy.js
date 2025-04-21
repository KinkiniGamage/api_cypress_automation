describe('Auth Token API Test', () => {
  let authToken;

  it('should retrieve an authentication token', () => {
    cy.getAuthToken().then((token) => {
    cy.log('Token: ${token}');
    });
  });

  it('check for invalid username', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'student',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason', 'Bad credentials');
      cy.log('Invalid login response:', response.body);
    });
  });

  it('check for invalid password', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password124'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason', 'Bad credentials');
      cy.log('Invalid login response:', response.body);
    });
  });
});
