/// <reference types="cypress" />

describe("View Loan Details Flow", () => {
  it("should navigate through PersonalDetails, LoanDetails and Summary components", () => {
    cy.visit("localhost:3001/");

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="dateOfBirth"]').type("2000-10-10");
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="mobile"]').type("0412345678");
    cy.get('input[name="address"]').type("Pitt street, NSW");
    cy.get('select[name="employmentStatus"]').select("selfemployed");
    cy.get('input[name="annualIncome"]').type("85000");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/loan-details");

    cy.get('input[name="vehiclePrice"]').type("50000");
    cy.get('input[name="deposit"]').type("25000");
    cy.get('input[name="loanPurpose"]').type("New car");
    cy.get('select[name="loanTerm"]').select("5");

    cy.intercept("POST", "http://localhost:3000/api/loan-details").as(
      "submitLoanDetails"
    );
    cy.get('button[type="submit"]').click();

    cy.wait("@submitLoanDetails").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(200);
    });

    cy.get(".loan-summary").should("contain", "25000");
    cy.get(".loan-summary").should("contain", "New car");
    cy.get(".loan-summary").should("contain", "5");
    cy.get(".lender-details").first().should("contain", "LenderA");
    cy.get(".lender-details").first().should("contain", "$450");
    cy.get(".lender-details").first().should("contain", "3% APR");
    cy.get(".lender-details").first().should("contain", "$100 processing fee");
  });
});

describe("View Loan Details Flow - Error scenario", () => {
  it("should navigate through PersonalDetails, LoanDetails and Summary components", () => {
    cy.visit("localhost:3001/");

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="dateOfBirth"]').type("2000-10-10");
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="mobile"]').type("0412345678");
    cy.get('input[name="address"]').type("Pitt street, NSW");
    cy.get('select[name="employmentStatus"]').select("selfemployed");
    cy.get('input[name="annualIncome"]').type("85000");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/loan-details");

    cy.get('input[name="vehiclePrice"]').type("50000");
    cy.get('input[name="deposit"]').type("25000");
    cy.get('input[name="loanPurpose"]').type("New car");
    cy.get('select[name="loanTerm"]').select("5");

    cy.intercept("POST", "http://localhost:3000/api/loan-details", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("submitLoanDetails");
    cy.get('button[type="submit"]').click();

    cy.wait("@submitLoanDetails").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(500);
    });

    cy.get(".button-container").should("contain", "Try again");
  });
});
