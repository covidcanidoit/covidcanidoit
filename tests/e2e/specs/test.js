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
    cy.contains("Category: Errand");
    cy.get(".activities").contains("Going");
  });
  it("Click Activity in Category", () => {
    cy.contains("Category: Errand");
    cy.contains(".activity-name", "Dog Walking").click();
    cy.contains("Dog");
    cy.contains("risk");
  });
});

/*
describe("Profile", () => {
  it("Navigates from homepage to profile", () => {
    cy.visit("/US/");
    cy.contains("Profile").click();
    cy.contains("Personalized Risk Screener");
  });
  it("Fill in profile after search", () => {
    cy.visit("/US/");
    cy.get(".v-select").type("sex");
    cy.contains("Sex with casual partner").click();
    cy.contains("Personalized Risk Screener");
    cy.contains("Submit").click();
    cy.contains("Sex with casual partner");
    cy.contains("risk");
  });
  it("Add additional risk", () => {
    cy.visit("/US/");
    cy.get(".v-select").type("Going to bar");
    cy.contains("Going to barber").click();
    cy.contains("Personalized Risk Screener");
    cy.contains("How old are you?");
    cy.get(":nth-child(1) > .content > .form-select").select("70+");
    //cy.contains("70+").click();
    cy.contains("Submit").click();
    cy.contains("Going to barber");
    cy.contains("risk");
    cy.contains("Your age puts you at a higher risk");
  });
});
*/

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
