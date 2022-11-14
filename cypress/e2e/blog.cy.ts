describe("Blog", () => {
  it("should filter and paginate", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // we see 3 posts displayed
    cy.get('[data-cy-testid="post"]').should("have.length", 3);

    // we try pagination
    cy.get('[data-cy-testid="prev"]').should("be.disabled");
    cy.get('[data-cy-testid="next"]').should("be.not.disabled").click();

    // successfull redirect
    cy.url().should("include", "/?page=2");

    // try search
    cy.get('[data-cy-testid="search"]').type("pariatur{enter}");
    cy.url().should("include", "search=pariatur");
    cy.get('[data-cy-testid="post"]').should("have.length", 1);
    cy.get('[data-cy-testid="post"]').contains("Pariatur");
    cy.get('[data-cy-testid="post-category"]').contains("Toys");
    // pariatur is not music
    cy.get('[data-cy-testid="post-category"]').should("not.have.text", "Music");
    cy.get('[data-cy-testid="prev"]').should("be.disabled");
    cy.get('[data-cy-testid="next"]').should("be.disabled");

    // try music category and search pariatur
    cy.get('[data-cy-testid="category-select"]').click();
    cy.contains("Music").click();
    cy.url().should("include", "category=music");

    cy.get('[data-cy-testid="post"]').should("have.length", 0);

    // back to toys
    cy.get('[data-cy-testid="category-select"]').click();
    cy.contains("Toys").click();
    cy.url().should("include", "category=toys");
    cy.url().should("not.include", "category=music");

    cy.get('[data-cy-testid="post"]').should("have.length", 1);

    // clear search
    cy.get('[data-cy-testid="search"]').clear().type("{enter}");
    cy.get('[data-cy-testid="post"]').should("have.length", 3);

    // only toys visible
    cy.get('[data-cy-testid="post"]').each(($el) => {
      cy.wrap($el).contains("Toys");
    });
  });

  it("should handle path not found", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/?search=asdfasdfasdf");

    // we see empty search page
    cy.get('[data-cy-testid="post"]').should("have.length", 0);

    cy.visit("http://localhost:3000/?category=asdfasdfasdf", {
      failOnStatusCode: false,
    });
    // we see 404
    cy.contains("404 - the page you are looking for could not be found");
  });

  it("should display single post", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy-testid="post"]').first().click();

    cy.url().should("include", "posts/libero-exercitationem-cum-veniam");

    cy.get('[data-cy-testid="post-title"]').should("be.not.empty");
    cy.get('[data-cy-testid="post-category"]').should("be.not.empty");
    cy.get('[data-cy-testid="post-excerpt"]').should("be.not.empty");
    cy.get('[data-cy-testid="post-image"]').should("be.visible");
    cy.get('[data-cy-testid="post-image"]').should("have.attr", "src");
  });
});

export {};
