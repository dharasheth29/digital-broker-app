export interface LoanDetailsBody {
  loanTerm: number;
  vehiclePrice: number;
  deposit: number;
}

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
