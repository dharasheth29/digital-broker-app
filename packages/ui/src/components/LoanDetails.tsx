import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "./FormContext";
import Summary from "./LoanSummary";
import { LoanDetailsResponse } from "../interfaces/loan.Interface";
import SubmitLoanDetails from "../functions/SubmitLoanDetails";
import { loanDetailsSchema } from "src/schemas/LoanDetailsSchema";

const LoanDetails: React.FC = () => {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState<LoanDetailsResponse>();
  const [apiError, setApiError] = useState(null);
  const { formData, setFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(loanDetailsSchema),
    defaultValues: formData,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await SubmitLoanDetails(data);
      setApiResponse(response);
    } catch (error: any) {
      console.log("API error: ", error);
      setApiError(error);
    }
  };

  const handleOnBackClick = () => {
    navigate("/");
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

  useEffect(() => {
    if (!formData?.firstName) {
      navigate("/");
    }
  }, [formData.firstName, navigate]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      Object.keys(parsedFormData).forEach((key) => {
        setValue(key, parsedFormData[key]);
      });
      setFormData(parsedFormData);
    }
  }, [setValue, setFormData]);

  const renderError = (handleOnBackClick: any) => {
    return (
      <>
        <div className="error">
          <p className="error-message">
            Something went wrong. You can try again by clicking the button below
          </p>
          <br />
          <br />
          <div className="button-container">
            <button
              name="back-button"
              type="button"
              onClick={handleOnBackClick}
            >
              Try again
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {apiResponse ? (
        <Summary
          {...apiResponse}
          formData={formData}
          setFormData={setFormData}
        />
      ) : apiError ? (
        renderError(handleOnBackClick)
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h2>Loan Details</h2>
            <label htmlFor="vehiclePrice">Vehicle Price</label>
            <input
              {...register("vehiclePrice")}
              placeholder="Vehicle Price"
              type="text"
              onBlur={handleBlur}
            />
            <p className="error-message">
              {errors?.vehiclePrice?.message?.toString()}
            </p>
            <label htmlFor="vehiclePrice">Deposit</label>
            <input
              {...register("deposit")}
              placeholder="Deposit"
              type="text"
              onBlur={handleBlur}
            />
            <p className="error-message">
              {errors?.deposit?.message?.toString()}
            </p>
            <label htmlFor="loanPurpose">Loan Purpose</label>
            <input
              {...register("loanPurpose")}
              placeholder="Loan Purpose"
              type="text"
              onBlur={handleBlur}
            />
            <p className="error-message">
              {errors?.loanPurpose?.message?.toString()}
            </p>
            <label htmlFor="loanTerm">Loan Term</label>
            <select {...register("loanTerm")} onBlur={handleBlur}>
              <option value="">--Select--</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
            </select>
            <p className="error-message">
              {errors?.loanTerm?.message?.toString()}
            </p>
            <br />
            <div className="button-container">
              <button
                name="back-button"
                type="button"
                onClick={handleOnBackClick}
              >
                Back
              </button>
              <button name="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoanDetails;
