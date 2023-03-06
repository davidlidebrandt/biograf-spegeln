describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5080/');
    cy.contains('Välkommen till Biograf Spegeln');
    cy.contains('Biograf Spegeln').click();
  })
})