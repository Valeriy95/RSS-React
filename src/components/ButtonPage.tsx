import React from 'react';
import { getAllPages } from '../pagination/getAllPages';
import { changePage } from '../pagination/changePage';
import '../style/style.css';
import { IButtonPage } from '../types/types';

class ButtonPage extends React.Component<IButtonPage> {
  constructor(props: IButtonPage) {
    super(props);
  }

  handlePageClick = (p: number) => {
    this.props.updateLoading(true);
    changePage(this.props.input, p).then((data) => {
      this.props.updateData(data.results);
      this.props.updateArrAllPages(getAllPages(data.count));
      this.props.updatePage(p);
      this.props.updateLoading(false);
    });
  };

  render() {
    return (
      <div className="page-container">
        {this.props.arrAllPages.map((p) => (
          <span
            onClick={() => this.handlePageClick(p)}
            key={p}
            className={this.props.page === p ? 'page page_current' : 'page'}
          >
            {p}
          </span>
        ))}
      </div>
    );
  }
}

export default ButtonPage;
