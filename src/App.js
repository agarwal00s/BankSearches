import React from "react";
import "./App.css";
import BankDetails from "./BankDetails";
import Axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      banks: [],
      selectedCity: "",
      searchBox: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchBox: event.target.value });
  }
  handleCityChange(event) {
    const updatedValue = event.target.value;
    this.setState({ selectedCity: updatedValue });
    const cachedRes = localStorage.getItem(updatedValue);
    if (cachedRes) this.setState({ banks: cachedRes });
    else {
      Axios.get("https://vast-shore-74260.herokuapp.com/banks", {
        params: {
          city: updatedValue
        }
      }).then(res => {
        this.setState({ banks: res.data });
        localStorage.setItem(updatedValue, res.data);
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <h3 className="m-4">Bank-Searches</h3>
        <label className="ml-4">
          CITY:
          <select
            className="ml-2"
            value={this.state.selectedCity}
            onChange={this.handleCityChange}
          >
            <option value="">Select One</option>
            <option value="DELHI">Delhi</option>
            <option value="KOLKATA">Kolkata</option>
            <option value="MUMBAI">Mumbai</option>
            <option value="BANGALORE">Bangalore</option>
            <option value="CHENNAI">Chennai</option>
          </select>
        </label>
        <label className="ml-4">
          Search:
          <input
            className="ml-2"
            type="text"
            value={this.state.searchBox}
            onChange={this.handleSearchChange}
          />
        </label>
        <BankDetails bankdetails={this.state.banks.slice(0, 5)} />
      </React.Fragment>
    );
  }
}

export default App;
