
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import range from 'lodash/range';

class Pager extends React.Component {

  static defaultProps = {
    onUpdate: () => {},
    selected: 0,
    totalItems: 0,
    itemsPerPage: 3,
    extraPages: 2
  };

  createPages() {

    const {
      selected,
      totalItems,
      itemsPerPage,
      extraPages
    } = this.props;

    const lastPage = Math.max(Math.ceil(totalItems / itemsPerPage) - 1, 0);

    const maxDisplay = Math.min(
        lastPage + 1,
        3 + 2 * extraPages // first, select, last, and 2 * extra pages
      );

    // Always display the first and last pages
    const pages = new Set([0, lastPage]);
    for (const pp of range(
                        Math.max(selected - extraPages, 0),
                        Math.min(selected + extraPages + 1, lastPage)
                        )) {
      pages.add(pp);
    }

    for (const pp of range(1, maxDisplay)) {

      if (pages.size >= maxDisplay) {
        break;
      }
      pages.add(pp);

      if (pages.size >= maxDisplay) {
        break;
      }
      pages.add(lastPage - pp);
    }

    return pages;
  }

  render() {
    const {
      onUpdate,
      selected
    } = this.props;

    const pages = this.createPages();

    const elems = [];
    let lastpp = -1;
    const spacerStyle = {display: 'inline-block'};
    let spacerCount = 0;
    for (const pp of [...pages].sort((a, b) => a - b)) {
      if (pp - lastpp > 1) {
        ++spacerCount;
        elems.push(<span key={`e${lastpp}-${pp}`} style={spacerStyle}/>);
      }
      lastpp = pp;
      elems.push(<RaisedButton
                    key={pp}
                    label={pp + 1}
                    onTouchTap={() => onUpdate(pp)}
                    primary={pp == selected}
                    style={{minWidth: 0}}/>);
    }
    if (spacerCount > 1) {
      spacerStyle.width = 2;
    } else {
      spacerStyle.width = 4;
    }

    if (elems.length == 1) {
      return <span />;
    }

    return (
      <div style={{textAlign: 'center'}}>
      {elems}
      </div>
    );
  }
}

export default Pager;
