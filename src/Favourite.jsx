import React, { useState } from "react";
import { Table } from "react-bootstrap";

const getBankDetails = bankdetails => {
  const bankrows = bankdetails.map(bank => {
    return (
      <tr key={bank.ifsc}>
        <td>{bank.bank_name}</td>
        <td>{bank.ifsc}</td>
        <td>{bank.branch}</td>
        <td>{bank.address}</td>
        <td>{bank.city}</td>
        <td>{bank.district}</td>
        <td>{bank.state}</td>
      </tr>
    );
  });
  return bankrows;
};

function Favourite() {
  const sessionfav = JSON.parse(sessionStorage.getItem("favourites")) || [];
  const [favourites] = useState(sessionfav);
  return (
    <React.Fragment>
      <h3 className="m-4">Bank-Searches</h3>
      <a href="/" className="ml-4 btn btn-outline-primary">
        Go Back to Bank Search
      </a>
      {favourites.length > 0 && (
        <div className="m-4">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Bank Name</th>
                <th>IFSC Code</th>
                <th>Branch</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>{getBankDetails(favourites)}</tbody>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
}

export default Favourite;
