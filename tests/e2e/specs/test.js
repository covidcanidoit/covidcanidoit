// https://docs.cypress.io/api/introduction/api.html

describe("Homepage", () => {
  it("Loads with header text", () => {
    cy.visit("/");
    cy.contains(".header", "Can I");
  });
  it("Shows the nav", () => {
    cy.visit("/");
    cy.contains(".navigation", "Find An Activity");
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
    cy.visit("/");
    cy.contains("Find An Activity").click();
    cy.contains("h1", "Browse activities by category");
  });
  it("Browse Category", () => {
    cy.contains("Errand").click();
    cy.contains("Category: Errand");
    cy.get(".activities").contains("Going");
  });
  it("Click Activity in Category", () => {
    //cy.contains("Dog Walking").click();
    cy.get(".router-link-active")
      .contains("Dog Walking")
      .click();
    cy.contains("Skip").click();
    cy.contains("Dog");
    cy.contains("risk level");
  });
});

describe("Profile", () => {
  it("Navigates from homepage to profile", () => {
    cy.visit("/");
    cy.contains("Profile").click();
    cy.contains("Personalized Risk Screener");
  });
  it("Fill in profile after search", () => {
    cy.visit("/");
    cy.get(".v-select").type("sex");
    cy.contains("Sex with casual partner").click();
    cy.contains("Personalized Risk Screener");
    cy.contains("Submit").click();
    cy.contains("Sex with casual partner");
    cy.contains("risk level");
  });
  it("Add additional risk", () => {
    cy.visit("/");
    cy.get(".v-select").type("Going to bar");
    cy.contains("Going to barber").click();
    cy.contains("Personalized Risk Screener");
    cy.contains("How old are you?");
    cy.get(":nth-child(1) > .content > .form-select").select("70+");
    //cy.contains("70+").click();
    cy.contains("Submit").click();
    cy.contains("Going to barber");
    cy.contains("risk level");
    cy.contains("Your age puts you at a higher risk");
  });
});

describe("Change Country", () => {
  it("Click and change country", () => {
    cy.visit("/");
    cy.get("#navbarDropdownMenuLink > img").click();
    cy.contains("US");
    cy.contains("UG");
    cy.get(".dropdown-menu > :nth-child(1)").click();
    cy.get(".v-select").click();
    cy.contains("Prayer congregations");
  });
});
