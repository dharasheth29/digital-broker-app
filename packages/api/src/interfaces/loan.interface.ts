export interface LoanDetailsResponse {
  lenders: Lender[];
}

export interface Lender {
  lenderName: string;
  monthlyRepayment: number;
  interestRate: number;
  fees: {
    amount: number;
    type: string;
  };
}

export interface LoanDetailsRequest {
  vehiclePrice: number;
  deposit: number;
  loanTerm: number;
}
