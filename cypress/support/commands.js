
Cypress.Commands.add('getAuthToken', () => {
  return cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/auth',
    body: {
      username: 'admin',
      password: 'password123'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('token');
    const token = response.body.token;
    // Instead of returning token directly, wrap it in a Cypress chain.
    return cy.wrap(token);
  });
});


Cypress.Commands.add('createBooking', () => {

  return cy.fixture('bookingData').then((bookingData) => {
    return cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: bookingData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
});