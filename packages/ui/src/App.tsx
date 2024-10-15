import { Route, Routes } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import { FormProvider } from "./components/FormContext";
import LoanDetails from "./components/LoanDetails";

const App = () => {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<PersonalDetails />} />
        <Route path="/loan-details" element={<LoanDetails />} />
      </Routes>
    </FormProvider>
  );
};

export default App;
