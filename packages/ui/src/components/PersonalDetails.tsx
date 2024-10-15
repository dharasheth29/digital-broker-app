import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object().shape({
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

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const employmentStatus = watch("employmentStatus");
  const handleFormSubmit = () => {
    navigate("/loan-details");
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    setValue(name, value);
    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value, { shouldValidate: true });
    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(newData));
      return newData;
    });
  };

  useEffect(() => {
    localStorage.removeItem("formData");
    const savedFormData = localStorage.getItem("formData");

    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      Object.keys(parsedFormData).forEach((key) => {
        setValue(key, parsedFormData[key]);
      });
      setFormData(parsedFormData);
    }
  }, [setValue, setFormData]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Personal Details</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          {...register("firstName")}
          placeholder="First Name"
          type="text"
          onBlur={handleBlur}
        />
        <p className="error-message">
          {errors?.firstName?.message?.toString()}
        </p>
        <label htmlFor="lastName">Last Name</label>
        <input
          {...register("lastName")}
          placeholder="Last Name"
          type="text"
          onBlur={handleBlur}
        />
        <p>{errors?.lastName?.message?.toString()}</p>
        <label htmlFor="dateOfBirth">Date Of Birth</label>
        <input
          {...register("dateOfBirth")}
          placeholder="Date of Birth"
          type="date"
          onBlur={handleBlur}
        />
        <p>{errors?.dateOfBirth?.message?.toString()}</p>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          onBlur={handleBlur}
        />
        <p>{errors?.email?.message?.toString()}</p>
        <label htmlFor="mobile">Mobile</label>
        <input
          {...register("mobile")}
          placeholder="04********"
          type="text"
          onBlur={handleBlur}
        />
        <p>{errors?.mobile?.message?.toString()}</p>
        <label htmlFor="address">Address</label>
        <input
          {...register("address")}
          placeholder="Address"
          type="text"
          onBlur={handleBlur}
        />
        <p>{errors?.address?.message?.toString()}</p>
        <label htmlFor="employmentStatus">Employment Status</label>
        <select {...register("employmentStatus")} onChange={handleSelectChange}>
          <option value="">--Select--</option>
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="selfemployed">Self-employed</option>
        </select>
        <p>{errors?.employmentStatus?.message?.toString()}</p>
        {employmentStatus === "employed" && (
          <>
            <label htmlFor="employerName">Employer Name</label>
            <input
              {...register("employerName")}
              placeholder="Employer Name"
              onBlur={handleBlur}
            />
            <p>{errors?.employerName?.message?.toString()}</p>
          </>
        )}
        <label htmlFor="annualIncome">Annual Income</label>
        <input
          {...register("annualIncome")}
          placeholder="Annual Income"
          type="text"
          onBlur={handleBlur}
        />
        <p>{errors?.annualIncome?.message?.toString()}</p>
        <br />
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
