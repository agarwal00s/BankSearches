import React from "react";
import "./App.css";
import BankDetails from "./BankDetails";

function App() {
  return (
    <React.Fragment>
      <h3 className="m-4">Bank-Searches</h3>
      <label className="ml-4">
        CITY:
        <select className="ml-2">
          <option value="">Select One</option>
          <option value="DELHI">Delhi</option>
          <option value="KOLKATA">Kolkata</option>
          <option selected value="MUMBAI">
            Mumbai
          </option>
          <option value="BANGALORE">Bangalore</option>
          <option value="CHENNAI">Chennai</option>
        </select>
      </label>
      <label className="ml-4">
        Search:
        <input className="ml-2" type="text" />
      </label>
      <BankDetails />
    </React.Fragment>
  );
}

export default App;
