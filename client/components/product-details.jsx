import React from 'react';

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/3')
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  render() {
    if (!this.state.product) {
      return null;
    }
    const { name, price, image, shortDescription, longDescription } = this.state.product;
    const formattedPrice = `$${(price / 100).toFixed(2)}`;
    return (

      <div>
        <div className="col-12">
          <div className="card">
            <a href="#" style={{ fontSize: '10px' }}className="text-muted mt-2 ml-4 mb-">&lt; Back to catalog</a>
            <div className="d-flex card-body py-0">
              <img className="col-5 pl-0 mt-4 detail-img" src={image} alt={name} />
              <div className="  col-7 card-body">
                <h6 className="card-title">{name}</h6>
                <h6 style={{ fontSize: '10px' }} className="card-subtitle text-muted">{formattedPrice}</h6>
                <p style={{ fontSize: '10px' }} className="card-text pt-1 pb-2">{shortDescription}</p>
              </div>
            </div>
            <div style={{ fontSize: '10px' }}className="card-body">{longDescription}</div>
          </div>
        </div>
      </div>
    );
  }
}
