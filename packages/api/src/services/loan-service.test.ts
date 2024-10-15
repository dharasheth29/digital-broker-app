import { LoanService } from "./loan-service";

const mockData = {
  loanTerm: 2,
  vehiclePrice: 50000,
  deposit: 25000,
};

const mockLenders = {
  lenders: [
    {
      lenderName: "LenderA",
      monthlyRepayment: 1075,
      interestRate: 3,
      fees: {
        amount: 100,
        type: "processing",
      },
    },
    {
      lenderName: "LenderB",
      monthlyRepayment: 1097,
      interestRate: 5.0,
      fees: {
        amount: 200,
        type: "application",
      },
    },
    {
      lenderName: "LenderC",
      monthlyRepayment: 1109,
      interestRate: 6.0,
      fees: {
        amount: 300,
        type: "no-fees",
      },
    },
  ],
};

describe("LoanService", () => {
  it("should return correct response", async () => {
    const objLoanService = new LoanService();
    const reponse = await objLoanService.getLoanDetails(mockData);

    expect(reponse).toMatchObject(mockLenders);
  });
});
