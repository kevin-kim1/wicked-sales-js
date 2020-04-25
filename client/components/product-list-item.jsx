import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col-4">
      <div className="card">
        <img className="card-img-top" src="./images/snuggie.jpg" alt="A ridiculous exercise tool" />
        <div className="card-body">
          <h5 className="card-title">Snuggie</h5>
          <h6 className="card-subtitle text-muted">$50.00</h6>
          <p className="card-text">Snuggie keeps you warm from head to toe!</p>
        </div>
      </div>
    </div>
  );
}
