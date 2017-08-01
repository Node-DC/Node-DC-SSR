
import React from 'react';
import {CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

import base from '../styles/base.css';

function Answer(props) {
  const {answer, user, date, usefulness} = props.answer;
  const svgStyle = {
    width: 12, heigth: 12, position: 'relative', top: 7
  };
  return (<div>
            <div
dangerouslySetInnerHTML={{'__html': answer.replace('\n', '<br /><br />')}} />
            <span style={{color: 'rgba(0, 0, 0, 0.54)'}}>By {user} ({date})</span>
            <div>
              Helpful?&nbsp;&nbsp;
                <ActionThumbUp style={svgStyle} />{usefulness.positive}
                &nbsp;
                <ActionThumbDown style={svgStyle} />{usefulness.negative}
            </div>
          </div>);
}

class Answers extends React.Component {

  static defaultProps = {
    answers: []
  };

  state = {
    showMore: false
  };

  showMoreToggle = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  render() {
    const {answers} = this.props;
    const {showMore} = this.state;

    const elems = [];

    for (const [idx, aa] of answers
                    .slice(0, !showMore ? 1 : undefined)
                    .entries()) {
      if (idx > 0) {
        elems.push(<Divider key={`div${idx}`} />);
      }
      elems.push(<Answer key={idx} answer={answers[idx]} />);
    }

    if (answers.length > 1) {
      elems.push(<FlatButton key="showHideButton"
                    label={showMore ? 'Hide' : 'More' }
                    secondary={true}
                    onTouchTap={this.showMoreToggle} />
                );
    }

    return <div>{elems}</div>;
  }

}


class ProductQa extends React.Component {

  render() {
    const {qa} = this.props;
    const contentStyle = {
      flex: '1 1 auto'
    };
    const headerStyle = Object.assign({}, contentStyle, {
      fontWeight: 'bold',
      flex: '0 1 100px',
      width: 100
    });

    return (
      <div>
        <CardHeader title={qa.question} subtitle={`By ${qa.user} (${qa.date})`}
            style={{paddingLeft: 0}}/>
        <div style={{display: 'flex'}}>
          <div style={headerStyle}>Answer(s):</div>
          <div style={contentStyle}>{qa.answers.length > 0 ?
            <Answers answers={qa.answers} />
          : 'No answers'}</div>
        </div>
      </div>
    );
  }
}

export default ProductQa;
