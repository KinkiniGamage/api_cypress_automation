it('should edit an existing booking successfully', () => {
  cy.createBooking().then((createResponse) => {
    const bookingId = createResponse.body.bookingid;
    cy.log('Created Booking ID: ' + bookingId);

    cy.getAuthToken().then((token) => {
      cy.log('Token: ' + token);

      cy.request({
        method: 'PUT',
        url: 'https://restful-booker.herokuapp.com/booking/${bookingId}',
        headers: {
          'Cookie': 'token=${token}'
        },
        body: {
          firstname: 'James',
          lastname: 'Brown',
          totalprice: 200,
          depositpaid: true,
          bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
          },
          additionalneeds: 'Breakfast'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq('James');
        expect(response.body.totalprice).to.eq(200);

        cy.log('Response: ' + JSON.stringify(response.body, null, 2));
      });
    });
  });
});
