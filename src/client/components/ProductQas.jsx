
import React from 'react';
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui/Card';

import ProductQaPage from './ProductQaPage';
import Pager from './Pager';

class ProductQas extends React.Component {

  state = {
    currentPage: 0
  };

  static defaultProps = {
    qas: [],
    qasPerPage: 2
  };

 updatePage = page => {
    this.setState({
      currentPage: page
    });
  }

  render() {
    const {currentPage} = this.state;
    const {
        qas,
        qasPerPage
      } = this.props;
    return (
      <Card style={{marginTop: 24}}>
        <CardTitle
          title="Customer Questions & Answers"
          style={{paddingBottom: 0}}
        />
        <CardText style={{paddingTop: 0, paddingBottom: 0}}>
          <ProductQaPage
            qas={qas}
            currentPage={currentPage}
            itemsPerPage={qasPerPage}/>
          <Pager
            onUpdate={this.updatePage}
            selected={currentPage}
            totalItems={(qas && qas.length) || 0}
            itemsPerPage={qasPerPage}
             /> <br/>
        </CardText>
      </Card>
    );
  }
}

export default ProductQas;
