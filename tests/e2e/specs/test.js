// https://docs.cypress.io/api/introduction/api.html

describe("Homepage", () => {
  it("Loads with header text", () => {
    cy.visit("/");
    cy.contains(".header", "I wonder if it's safe to");
  });
  it("Shows the nav", () => {
    cy.visit("/");
    cy.contains(".navigation", "Find An Activity");
  });
});

describe("Browsing Categories", () => {
  it("Navigates from homepage to categories", () => {
    cy.visit("/");
    cy.contains("Find An Activity").click();
    cy.contains("h1","Browse activities by category");
  });

})
