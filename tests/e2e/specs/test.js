// https://docs.cypress.io/api/introduction/api.html

describe("Homepage", () => {
  it("Loads with header text", () => {
    cy.visit("/US/");
    cy.contains(".header", "What's the risk");
  });
  it("Shows the nav", () => {
    cy.visit("/US/");
    cy.contains("header", "Activities");
  });
});

describe("Searching", () => {
  it("Click in search box", () => {
    cy.get(".v-select").click();
    cy.contains("Biking");
  });
  it("Entering a search term", () => {
    cy.get(".v-select").type("sex");
    cy.contains("Sex with");
  });
});

describe("Browsing Categories", () => {
  it("Navigates from homepage to categories", () => {
    cy.visit("/US/all");
    cy.contains(".header", "What's the risk");
    cy.contains("header a", "Activities").click();
    cy.contains("h1", "Browse activities by category");
  });
  it("Browse Category", () => {
    cy.contains("Errand").click();
    cy.contains("Errand");
    cy.get(".activity-list").contains("Going");
  });
  it("Click Activity in Category", () => {
    cy.contains("Errand");
    cy.contains(".activity-name", "Dog Walking").click();
  });
  it("Select region", () => {
    cy.contains("Select a region/state");
    cy.get(".v-select").type("a");
  });

  it("View risk page", () => {
    cy.contains("Dog", { timeout: 10000 });
    cy.contains("risk");
  });
});

describe("Change Country", () => {
  it("Click and change country", () => {
    cy.visit("/US/");
    cy.get('button[aria-label="Select country"]').click({
      multiple: true,
      force: true
    });
    cy.contains("US");
    cy.contains("UG");
    cy.get(".v-list-item")
      .contains("UG")
      .click();
    cy.get(".v-select").click();
    cy.contains("Prayer congregations");
    cy.visit("/US/");
  });
  it("Direct link to a non-US country", () => {
    cy.visit("/UG/");
    cy.get(".v-select").click();
    cy.contains("Prayer congregations");
  });
});
