import React from 'react';

export default function ProductListItem(props) {
  const { name, price, image, shortDescription, productId } = props.product;
  const formattedPrice = `$${(price / 100).toFixed(2)}`;
  return (
    <div className="col-4 mt-3 cursor">
      <div className="h-100 card" onClick={() => props.setView('details', { productId })}>
        <img className="card-img" src={image} alt="card-image"/>
        <div className="card-body pt-3 pb-0">
          <h6 className="card-title">{name}</h6>
          <h6 style={{ fontSize: '10px' }} className="card-subtitle text-muted">{formattedPrice}</h6>
          <p style={{ fontSize: '10px' }}className="card-text pt-1 pb-2">{shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
