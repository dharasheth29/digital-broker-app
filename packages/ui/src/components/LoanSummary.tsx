import { useNavigate } from "react-router-dom";
import { LoanDetailsResponse } from "../interfaces/loan.Interface";

interface SummaryProps extends LoanDetailsResponse {
  formData: any;
  setFormData: (data: any) => void;
}

const LoanSummary: React.FC<SummaryProps> = ({
  lenders,
  formData,
  setFormData,
}) => {
  const { vehiclePrice, loanPurpose, loanTerm, deposit } = formData;
  const navigate = useNavigate();
  const handleTryAgainClick = () => {
    localStorage.removeItem("formData");
    setFormData(null);
    navigate("/");
  };

  const renderItems = () => {
    return (
      <div className="loan-summary">
        <h2>Loan details summary</h2>
        <div>
          <strong>Loan Amount:</strong> {vehiclePrice - deposit}
        </div>
        <div>
          <strong>Loan Purpose:</strong> {loanPurpose}
        </div>
        <div>
          <strong>Loan Term:</strong> {loanTerm}
        </div>
        <br />
        <h3>Lenders:</h3>
        {lenders.map((lender, index) => (
          <div key={index} className="lender-details">
            <h4>{lender.lenderName}</h4>
            <ul>
              <li>
                <strong>Monthly Repayment:</strong> ${lender.monthlyRepayment}
              </li>
              <li>
                <strong>Interest Rate:</strong> {lender.interestRate}% APR
              </li>
              <li>
                <strong>Fees:</strong> ${lender.fees.amount} {lender.fees.type}{" "}
                {lender.fees.type !== "no-fees" ? "fee" : ""}
              </li>
            </ul>
          </div>
        ))}
        <br />
        <div className="button-container">
          <button
            name="back-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Update values
          </button>
          <button
            name="submit-button"
            type="submit"
            onClick={handleTryAgainClick}
          >
            Start again
          </button>
        </div>
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};

export default LoanSummary;
