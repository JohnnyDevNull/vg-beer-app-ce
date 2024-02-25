describe('Page Beer List', () => {
  beforeEach(() => {
    cy.visit('/beer');
  })

  it('should load the page with 10 items, default filter and pagination', () => {
    cy.getBySel('beer-list-header').should('exist').should('contain.text', 'BeerList page');
    cy.getBySel('filter-name-input').should('be.visible');
    cy.getBySel('filter-city-input').should('be.visible');
    cy.getBySel('filter-state-input').should('be.visible');
    cy.getBySel('filter-postal-input').should('be.visible');
    cy.getBySel('filter-type-select').should('be.visible');
    cy.getBySel('filter-sort-select').should('be.visible');

    cy.getBySel('beer-list-item-btn').should('have.length', 10);

    cy.getBySel('beer-list-pagination').should('be.visible');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(2).should('have.text', '2');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(3).should('have.text', '3');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(4).should('have.text', '4');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(4).should('have.text', '4');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(5).should('have.text', '5');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(6).should('have.text', '…');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(7).should('have.text', '824');
  })

  it('should filter by name', () => {
    cy.getBySel('filter-name-input').should('be.visible').type('Brewers Tasting Room');
    cy.getBySel('beer-list-item-btn').should('have.length', 1);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 3);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
  })

  it('should filter by city', () => {
    cy.getBySel('filter-city-input').should('be.visible').type('Orlando');
    cy.getBySel('beer-list-item-btn').should('have.length', 10);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 4);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(2).should('have.text', '2');
  })

  it('should filter by state', () => {
    cy.getBySel('filter-state-input').should('be.visible').type('Rhode Island');
    cy.getBySel('beer-list-item-btn').should('have.length', 10);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 6);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(2).should('have.text', '2');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(3).should('have.text', '3');
    cy.getBySel('beer-list-pagination').find('li')
      .eq(4).should('have.text', '4');
  })

  it('should filter by postal', () => {
    cy.getBySel('filter-postal-input').should('be.visible').type('02920-5327');
    cy.getBySel('beer-list-item-btn').should('have.length', 2);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 3);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
  })

  it('should filter by type', () => {
    cy.getBySel('filter-type-select').click();
    cy.get('.MuiMenu-paper .MuiMenu-list').should('be.visible').contains('bar').click();

    cy.getBySel('beer-list-item-btn').should('have.length', 4);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 3);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(1).should('have.text', '1');
  })

  it('should sort results', () => {
    cy.getBySel('filter-postal-input').should('be.visible').type('02920-5327');
    cy.getBySel('beer-list-item-btn').should('have.length', 2);
    cy.getBySel('beer-list-item-btn').eq(0).should('contain.text', 'Brutopia Brewery and Kitchen');
    cy.getBySel('beer-list-item-btn').eq(1).should('contain.text', 'Revival Brewing');

    cy.getBySel('filter-sort-select').click();
    cy.get('.MuiMenu-paper .MuiMenu-list').should('be.visible').contains('DESC').click();
    cy.getBySel('beer-list-item-btn').eq(0).should('contain.text', 'Revival Brewing');
    cy.getBySel('beer-list-item-btn').eq(1).should('contain.text', 'Brutopia Brewery and Kitchen');
  })

  it('should reset the filter', () => {
    cy.getBySel('filter-name-input').should('be.visible').type('test');
    cy.getBySel('filter-city-input').should('be.visible').type('test');
    cy.getBySel('filter-state-input').should('be.visible').type('test');
    cy.getBySel('filter-postal-input').should('be.visible').type('test');

    cy.getBySel('filter-type-select').click();
    cy.get('.MuiMenu-paper .MuiMenu-list').should('be.visible').contains('bar').click();

    cy.getBySel('filter-sort-select').click();
    cy.get('.MuiMenu-paper .MuiMenu-list').should('be.visible').contains('DESC').click();

    cy.getBySel('beer-list-item-btn').should('have.length', 0);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 2);

    cy.getBySel('filter-clear-btn').click();

    cy.getBySel('beer-list-item-btn').should('have.length', 10);
    cy.getBySel('beer-list-pagination').should('be.visible')
      .find('li')
      .should('have.length', 9);
    cy.getBySel('beer-list-pagination').find('li')
      .eq(7).should('have.text', '824');
  })

  it('should open details page', () => {
    cy.getBySel('beer-list-item-btn').should('have.length', 10);

    cy.getBySel('filter-name-input')
      .should('exist')
      .should('be.visible')
      .type('Brewers Tasting Room');

    cy.getBySel('beer-list-item-btn').should('have.length', 1);

    cy.getBySel('beer-list-item-btn').contains('Brewers Tasting Room').click();

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
