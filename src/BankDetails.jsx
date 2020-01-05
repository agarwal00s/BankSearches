import React from "react";
import { Table } from "react-bootstrap";
import "./App.css";

const getBankDetails = (bankdetails, indexOfFirstBank, addBanktoFavourites) => {
  let count = 0;
  const bankrows = bankdetails.map(bank => {
    const bankIndex = indexOfFirstBank + count;
    count += 1;
    return (
      <tr key={bank.ifsc}>
        <td>{bank.bank_name}</td>
        <td>{bank.ifsc}</td>
        <td>{bank.branch}</td>
        <td>{bank.address}</td>
        <td>{bank.city}</td>
        <td>{bank.district}</td>
        <td>{bank.state}</td>
        <td>
          {bank.favourites ? (
            <button className="btn btn-outline-primary disabled">
              Added to Favourites
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={() => addBanktoFavourites(bankIndex)}
            >
              Add to Favourites
            </button>
          )}
        </td>
      </tr>
    );
  });
  return bankrows;
};

function BankDetails(props) {
  if (!props.loading && props.bankdetails.length) {
    return (
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getBankDetails(
              props.bankdetails,
              props.indexOfFirstBank,
              props.addBanktoFavourites
            )}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return null;
  }
}

export default BankDetails;
