import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let productCards;
    if (this.state.products.length) {
      productCards = this.state.products.map(product =>
        <ProductListItem
          key={product.productId}
          item={product}
        />
      );
    }
    return (
      <div className="row">
        {productCards}
      </div>
    );
  }
}
