import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/, "First name must be alphabetic")
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/, "Last name must be alphabetic")
    .required(),
  dateOfBirth: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Date of birth must be in the format YYYY-MM-DD",
    }),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .email()
    .required()
    .messages({
      "string.email": "Invalid email",
    }),
  mobile: Joi.string()
    .pattern(/^0\d{9}$/, "Invalid mobile")
    .required()
    .messages({
      "string.pattern.base": "Mobile must be a number",
    }),
  annualIncome: Joi.number().min(1).required().messages({
    "string.pattern.base": "income must be a greater than 0",
  }),
  address: Joi.string().required(),
  employmentStatus: Joi.string().required(),
  employerName: Joi.string().when("employmentStatus", {
    is: "employed",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  vehiclePrice: Joi.number().min(2000).required(),
  deposit: Joi.number()
    .required()
    .custom((value, helpers) => {
      const { vehiclePrice } = helpers.state.ancestors[0];
      if (vehiclePrice - value <= 2000) {
        return helpers.message({
          custom:
            "Difference between Vehicle price and deposit should be greater than 2000",
        });
      }
      return value;
    })
    .messages({
      "number.base": "Deposit must be a number",
      "any.required": "Deposit is required",
    }),
  loanPurpose: Joi.string().required(),
  loanTerm: Joi.string().required(),
});

export default schema;
