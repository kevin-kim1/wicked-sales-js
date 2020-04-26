import React from 'react';

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }
}
