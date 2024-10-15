import { HttpStatusCode } from "axios";
import { Router } from "express";
import schema from "../middleware/validation";
import { LoanService } from "../services/loan-service";

const router = Router();

router.post("/loan-details", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatusCode.BadRequest).send(error.message);
    return;
  }
  const objLoanService = new LoanService();
  try {
    const response = await objLoanService.getLoanDetails(value);
    res.status(HttpStatusCode.Ok).send(response);
  } catch (error: any) {
    // error can be logged here for the obervability purposes
    res.status(HttpStatusCode.InternalServerError).send(error.message);
  }
});

export default router;
