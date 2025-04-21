describe('Create Booking API Test', () => {
  it('should create a new booking successfully', () => {

    cy.fixture('bookingData').then((bookingData) => {
      cy.createBooking(bookingData).then((bookingResponse) => {
        expect(bookingResponse.status).to.eq(200);
        expect(bookingResponse.body).to.have.property('bookingid');
        expect(bookingResponse.body.booking).to.deep.include(bookingData);
        const bookingId = bookingResponse.body.bookingid;
        cy.log('Booking ID:', bookingId);
      });
    });
  });
});
