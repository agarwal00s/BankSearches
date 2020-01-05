import React from "react";
import "./App.css";
import BankDetails from "./BankDetails";
import Axios from "axios";
import { Pagination } from "./Pagination";

class BankSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      banks: [],
      selectedCity: "",
      searchBox: "",
      currentPage: 1,
      banksPerPage: 100,
      loading: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.sortCurrentView = this.sortCurrentView.bind(this);
    this.addBanktoFavourites = this.addBanktoFavourites.bind(this);
  }

  sortCurrentView(val) {
    let arr = Object.assign([], this.state.banks);
    arr.forEach(ele => {
      let count = 0;
      if (ele.bank_name.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.ifsc.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.branch.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.address.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.city.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.district.toLowerCase().indexOf(val) !== -1) count += 1;
      if (ele.state.toLowerCase().indexOf(val) !== -1) count += 1;
      ele.count = count;
    });
    arr.sort((a, b) => (a.count > b.count ? -1 : 1));
    this.setState({ banks: arr });
  }

  handleSearchChange(event) {
    const val = event.target.value;
    this.setState({ searchBox: val });
    event.preventDefault();
    this.sortCurrentView(val.toLowerCase());
  }
  handleCityChange(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const updatedValue = event.target.value;
    this.setState({ selectedCity: updatedValue });
    const cachedRes = sessionStorage.getItem(updatedValue);
    if (cachedRes) {
      this.setState({ banks: JSON.parse(cachedRes) });
      this.setState({ loading: false });
    } else {
      Axios.get("https://vast-shore-74260.herokuapp.com/banks", {
        params: {
          city: updatedValue
        }
      }).then(res => {
        this.setState({ banks: res.data });
        sessionStorage.setItem(updatedValue, JSON.stringify(res.data));
        this.setState({ loading: false });
      });
    }
  }
  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }
  handlePageChange(event) {
    this.setState({ banksPerPage: event.target.value });
    event.preventDefault();
  }

  addBanktoFavourites(bankIndex) {
    let arr = Object.assign([], this.state.banks);
    arr[bankIndex].favourites = true;
    this.setState({ banks: arr });
    sessionStorage.setItem(this.state.selectedCity, JSON.stringify(arr));
  }
  render() {
    const indexOfLastBank = this.state.currentPage * this.state.banksPerPage;
    const indexOfFirstBank = indexOfLastBank - this.state.banksPerPage;
    const currentBanks = this.state.banks.slice(
      indexOfFirstBank,
      indexOfLastBank
    );
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
        <label className="ml-4">
          No. of rows:
          <input
            className="ml-2"
            type="number"
            value={this.state.banksPerPage}
            onChange={this.handlePageChange}
          />
        </label>
        <Pagination
          banksPerPage={this.state.banksPerPage}
          totalBanks={this.state.banks.length}
          paginate={this.paginate}
          currentSelectedPage={this.state.currentPage}
          loading={this.state.loading}
        />
        <BankDetails
          loading={this.state.loading}
          bankdetails={currentBanks}
          indexOfFirstBank={indexOfFirstBank}
          addBanktoFavourites={this.addBanktoFavourites}
        />
      </React.Fragment>
    );
  }
}

export default BankSearch;
