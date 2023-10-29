import React from 'react';
import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { IButtonSearch } from '../types/types';

class ButtonSearch extends React.Component<IButtonSearch> {
  constructor(props: IButtonSearch) {
    super(props);
  }

  handleButtonClick = () => {
    this.props.updateLoading(true);
    localStorage.setItem('inputValue', this.props.input);
    getPerson(this.props.input).then((data) => {
      this.props.updatePage(1);
      if (data) {
        this.props.updateData(data.results);
        this.props.updateArrAllPages(getAllPages(data.count));
      }
      this.props.updateLoading(false);
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleButtonClick}>Поиск</button>
      </>
    );
  }
}

export default ButtonSearch;
