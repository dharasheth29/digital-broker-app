import React, { createContext, useContext, useState } from "react";

const FormContext = createContext<any>(null);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState({});
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
