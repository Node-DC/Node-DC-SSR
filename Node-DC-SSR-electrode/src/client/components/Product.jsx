
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import pick from 'lodash/pick';
import ProductDetails from './ProductDetails';
import ProductsPreview from './ProductsPreview';
import ProductQas from './ProductQas';
import ProductReviews from './ProductReviews';

class Product extends React.Component {
  render() {
    const {product} = this.props;
    const details = pick(product,
      'name',
      'manufacturer',
      'modelNumber',
      'rating',
      'price',
      'pictures',
      'description',
      'highlights',
      'tags'
      );
    return (
        <div>
          <ProductDetails {...details}/>
          <ProductsPreview title="Similar Products" products={product.related}/>
          <ProductsPreview title="Recommended Products" products={product.recommended}/>
          <ProductQas qas={product.qas} />
          <ProductReviews summary={product.rating} reviews={product.reviews} />
        </div>
      );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {product} = state;
  return { product };
}

export default connect(mapStateToProps)(Product);
