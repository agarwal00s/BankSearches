import React from "react";
import { Table } from "react-bootstrap";
import "./App.css";

const getBankDetails = bankdetails => {
  const bankrows = bankdetails.map(bank => {
    return (
      <tr>
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

function BankDetails(props) {
  if (props.bankdetails.length) {
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
            </tr>
          </thead>
          <tbody>{getBankDetails(props.bankdetails)}</tbody>
        </Table>
      </div>
    );
  } else {
    return null;
  }
}

export default BankDetails;
