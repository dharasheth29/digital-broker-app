import axios from "axios";
import {
  LoanDetailsBody,
  LoanDetailsResponse,
} from "../interfaces/loan.Interface";

const SubmitLoanDetails = async (
  body: LoanDetailsBody
): Promise<LoanDetailsResponse> => {
  const { data } = await axios.post(
    "http://localhost:3000/api/loan-details",
    body
  );

  return data;
};

export default SubmitLoanDetails;
