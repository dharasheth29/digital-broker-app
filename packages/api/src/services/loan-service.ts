import {
  LoanDetailsRequest,
  LoanDetailsResponse,
} from "../interfaces/loan.interface";
import loanDetailsResponseMock from "../mocks/loan-data";

export class LoanService {
  constructor() {}

  async getLoanDetails(data: LoanDetailsRequest): Promise<LoanDetailsResponse> {
    const loanTerm = data.loanTerm;
    const vehiclePrice = data.vehiclePrice;
    const deposit = data.deposit;
    const loanAmount = vehiclePrice - deposit;

    const lenderDetails = loanDetailsResponseMock.lenders.map((lender) => {
      const monthlyInterestRate = lender.interestRate / 12 / 100;
      const numberOfMonthlyInstallments = loanTerm * 12;
      const monthlyRepayment =
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfMonthlyInstallments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfMonthlyInstallments) - 1);

      const roundedMonthlyRepayment = Math.ceil(monthlyRepayment);

      return { ...lender, monthlyRepayment: roundedMonthlyRepayment };
    });

    return {
      lenders: lenderDetails,
    };
  }
}
