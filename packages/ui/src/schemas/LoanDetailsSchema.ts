import * as yup from "yup";

export const personalDetailsSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "First name must be alphabetic")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Last name must be alphabetic")
    .required("Last name is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .email("Invalid email format")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^0\d{9}$/, "Invalid mobile")
    .required("Mobile is required"),
  address: yup.string().required("Address is required"),
  employmentStatus: yup.string().required("Employment status is required"),
  employerName: yup.string().when("employmentStatus", {
    is: (employmentStatus: string) => {
      return employmentStatus === "employed";
    },
    then: (s) => s.required("Employer name is required"),
    otherwise: (s) => s,
  }),
  annualIncome: yup
    .number()
    .typeError("Annual income must be a number")
    .min(1, "Annual income must be greater than 0"),
});

export const loanDetailsSchema = yup.object().shape({
  vehiclePrice: yup
    .number()
    .typeError("Vehicle price must be a number")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? 0 : value
    )
    .min(2000, "Vehicle price should be minimum 2000")
    .default(2000)
    .required("Vehicle price is required"),
  deposit: yup
    .number()
    .typeError("Deposit must be a number")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? 0 : value
    )
    .when("vehiclePrice", (vehiclePrice, schema) => {
      return schema.test(
        "is-less-than-vehiclePrice",
        "Deposit must be less than vehicle price",
        function (deposit: any) {
          const { vehiclePrice } = this.parent;
          return deposit < vehiclePrice;
        }
      );
    })
    .test(
      "final value",
      "Difference between Vehicle price and deposit should be greater than 2000",
      function (deposit: any) {
        const { vehiclePrice } = this.parent;
        return vehiclePrice - deposit > 2000;
      }
    ),
  loanPurpose: yup.string().required("Loan Purpose is required"),
  loanTerm: yup.string().min(0).required("Loan Term is required"),
});
