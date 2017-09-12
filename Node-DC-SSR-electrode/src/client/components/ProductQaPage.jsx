
import React from 'react';
import Divider from 'material-ui/Divider';

import ProductQa from './ProductQa';

class ProductQaPage extends React.Component {

  static defaultProps = {
    qas: [],
    currentPage: 0,
    itemsPerPage: 3
  };


  render() {

    const {
        qas,
        currentPage,
        itemsPerPage
      } = this.props;

    const startIndex = currentPage * itemsPerPage;
    const elems = [];
    for (const [idx, qa] of qas.slice(startIndex,
                                (currentPage + 1) * itemsPerPage)
                              .entries()) {

      if (idx > 0) {
        elems.push(<Divider key={`hr${idx}`} />);
      }

      elems.push(
        <ProductQa
              key={startIndex + idx}
              qa={qa}
            />);

    }

    return (
      <div>
      { elems.length > 0 ?
        elems :
        'No questions have been asked about this product'
      }
      </div>
    );
  }
}

export default ProductQaPage;
