import { LoanDetailsResponse } from "../interfaces/loan.interface";

const loanDetailsResponseMock: LoanDetailsResponse = {
  lenders: [
    {
      lenderName: "LenderA",
      monthlyRepayment: 0,
      interestRate: 3,
      fees: {
        amount: 100,
        type: "processing",
      },
    },
    {
      lenderName: "LenderB",
      monthlyRepayment: 0,
      interestRate: 5.0,
      fees: {
        amount: 200,
        type: "application",
      },
    },
    {
      lenderName: "LenderC",
      monthlyRepayment: 0,
      interestRate: 6.0,
      fees: {
        amount: 0,
        type: "no-fees",
      },
    },
  ],
};

export default loanDetailsResponseMock;
