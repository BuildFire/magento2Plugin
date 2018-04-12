import React, { Component } from 'react';
import { getCategoryDetails } from '../services/category-service';
import { getProductsForCategory } from '../services/product-service';
import { addToCart } from '../services/cart-service';
import Browse from '../components/browse';
import Spinner from 'react-spinkit';

class BrowseContainer extends Component {
  state = {
    isHydrated: false
  };

  componentDidMount() {
    getCategoryDetails(this.props.match.params.id)
      .then(category => {
        getProductsForCategory(this.props.match.params.id).then(products => {
          this.setState({
            isHydrated: true,
            products: JSON.parse(products).items.filter(
              item => item.status === 1
            ),
            category: JSON.parse(category)
          });
        });
      })
      .catch(err => console.log(err));
  }

  handleClickAddToCart = ({ target }) =>
    buildfire.auth.login(null, () =>
      addToCart({ sku: target.name, qty: 1 })
        .then()
        .catch(err => console.log(err))
    );

  render() {
    return this.state.isHydrated ? (
      <Browse
        products={this.state.products}
        categoryName={this.state.category.name}
        imageAttributeKey={window.buildfireConfig.productImageAtName}
        shortDescriptionAtName={
          window.buildfireConfig.shortCategoryDescriptionAtName
        }
        onClickAddToCart={this.handleClickAddToCart}
      />
    ) : (
      <Spinner color="gray" />
    );
  }
}

export default BrowseContainer;
