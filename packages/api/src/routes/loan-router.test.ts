import request from "supertest";
import express, { Express } from "express";
import { LoanService } from "../services/loan-service";
import schema from "../middleware/validation";
import { HttpStatusCode } from "axios";
import router from "./loan-router";

jest.mock("../services/loan-service");
jest.mock("../middleware/validation");

describe("LoanDetailsRoute", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/api", router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if validation fails", async () => {
    (schema.validate as jest.Mock).mockReturnValue({
      error: { message: "Validation error" },
      value: {},
    });

    const res = await request(app)
      .post("/api/loan-details")
      .send({ loanAmount: 25000 }); // Send any invalid input

    expect(res.status).toBe(HttpStatusCode.BadRequest);
    expect(res.text).toBe("Validation error");
  });

  it("should return 200 and loan details on valid request", async () => {
    (schema.validate as jest.Mock).mockReturnValue({
      error: null,
      value: { loanAmount: 25000, loanTerm: 2, interestRate: 3 },
    });

    const mockLoanDetails = { monthlyRepayment: 1000 };
    (LoanService.prototype.getLoanDetails as jest.Mock).mockResolvedValue(
      mockLoanDetails
    );

    const res = await request(app)
      .post("/api/loan-details")
      .send({ loanAmount: 25000, loanTerm: 2, interestRate: 3 });

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.body).toEqual(mockLoanDetails);
  });

  it("should return 500 if there is an internal server error", async () => {
    (schema.validate as jest.Mock).mockReturnValue({
      error: null,
      value: { loanAmount: 25000, loanTerm: 2, interestRate: 3 },
    });

    const errorMessage = "Internal server error";
    (LoanService.prototype.getLoanDetails as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const res = await request(app)
      .post("/api/loan-details")
      .send({ loanAmount: 25000, loanTerm: 2, interestRate: 3 });

    expect(res.status).toBe(HttpStatusCode.InternalServerError);
    expect(res.text).toBe(errorMessage);
  });
});
