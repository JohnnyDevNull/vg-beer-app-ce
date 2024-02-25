describe('Page Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add, reload and delete favorites', () => {
    cy.getBySel('beer-list-chk').should('have.length', 10);
    cy.getBySel('beer-list-link').should('have.length', 10);
    cy.wait(500);

    cy.getBySel('beer-list-chk').eq(3).scrollIntoView().click();
    cy.get('.Mui-checked').should('have.length', 1);

    cy.getBySel('beer-list-chk').eq(4).scrollIntoView().click();
    cy.get('.Mui-checked').should('have.length', 2);

    cy.getBySel('beer-list-chk').eq(5).scrollIntoView().click();
    cy.get('.Mui-checked').should('have.length', 3);

    cy.getBySel('beer-list-save-btn').click();

    cy.getBySel('favorite-list-chk').should('have.length', 3);
    cy.getBySel('favorite-list-link').should('have.length', 3);
    cy.reload(true);
    cy.getBySel('favorite-list-chk').should('have.length', 3);
    cy.getBySel('favorite-list-link').should('have.length', 3);

    cy.getBySel('favorite-list-chk').eq(1).scrollIntoView().click();
    cy.get('.Mui-checked').should('have.length', 1);
    cy.getBySel('remove-items-btn').click();

    cy.getBySel('favorite-list-chk').should('have.length', 2);
    cy.getBySel('favorite-list-link').should('have.length', 2);
    cy.reload(true);
    cy.getBySel('favorite-list-chk').should('have.length', 2);
    cy.getBySel('favorite-list-link').should('have.length', 2);

    cy.getBySel('remove-all-items-btn').click();
    cy.getBySel('favorite-list-chk').should('not.exist');
    cy.reload(true);
    cy.getBySel('favorite-list-chk').should('not.exist');
  })

  it('should filter the list', () => {
    cy.getBySel('beer-list-chk').should('have.length', 10);
    cy.wait(500);

    cy.getBySel('list-filter-input')
      .should('exist')
      .should('be.visible')
      .type('Brewers Tasting Room');

    cy.getBySel('beer-list-chk').should('have.length', 3);
    cy.getBySel('beer-list-link').should('have.length', 3);
    cy.getBySel('beer-list-link').should('contain.text', 'Brewers Tasting Room');
  })

  it('should open details page', () => {
    cy.getBySel('beer-list-chk').should('have.length', 10);
    cy.wait(500);

    cy.getBySel('list-filter-input')
      .should('exist')
      .should('be.visible')
      .type('Brewers Tasting Room');

    cy.getBySel('beer-list-chk').should('have.length', 3);
    cy.getBySel('beer-list-link').should('have.length', 3);
    cy.getBySel('beer-list-link').contains('Brewers Tasting Room').click();
    cy.getBySel('beer-header').should('contain.text', 'Brewers Tasting Room');
    cy.getBySel('beer-type')
      .should('contain.text', 'Type:')
      .should('contain.text', 'brewpub');
    cy.getBySel('beer-address')
      .should('contain.text', 'Address:')
      .should('contain.text',
        'Brewers Tasting Room, 11270 4th St N Ste 202, Saint Petersburg, 33716-2937, Florida, United States'
      );
    cy.getBySel('beer-phone')
      .should('contain.text', 'Phone:')
      .should('contain.text', '7278733900');
    cy.getBySel('beer-website')
      .should('contain.text', 'Website:')
      .should('contain.text', 'http://www.brewerstastingroom.com');
  })
});
