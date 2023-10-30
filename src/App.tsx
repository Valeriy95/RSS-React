import React from 'react';
import { getPerson } from './API/getPerson';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import ButtonPage from './components/ButtonPage';
import ItemPerson from './components/ItemPerson';
import InputNew from './components/InputNew';
import ButtonSearch from './components/ButtonSearch';
import { IPerson, MyComponentState } from './types/types';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';

class App extends React.Component<object, MyComponentState> {
  constructor(props: object) {
    console.log(props);
    super(props);
    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
      data: [],
      loading: false,
      arrAllPages: [],
      page: 1,
      error: false,
    };
  }

  componentDidMount() {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue !== null) {
      this.setState({
        inputValue: localStorage.getItem('inputValue') as string,
      });
    } 
    this.setState({ loading: true });
    getPerson(this.state.inputValue).then((data) => {
      if (data) {
        this.setState({ data: data.results });
        this.setState({ arrAllPages: getAllPages(data.count) });
      }
      this.setState({ loading: false });
    });
  }

  updateLoading = (newLoading: boolean) => {
    this.setState({ loading: newLoading });
  };

  updateData = (newData: IPerson[]) => {
    this.setState({ data: newData });
  };

  updateArrAllPages = (newArrAllPages: number[]) => {
    this.setState({ arrAllPages: newArrAllPages });
  };

  updatePage = (newPage: number) => {
    this.setState({ page: newPage });
  };

  updateInput = (newInput: string) => {
    this.setState({ inputValue: newInput });
  };

  updateError = (newEr: boolean) => {
    this.setState({ error: newEr });
  };

  render() {
    return (
      <div>
        <ErrorBoundary error={this.state.error}>
        <div>
          <InputNew
            input={this.state.inputValue}
            updateInput={this.updateInput}
          />
          <ButtonSearch
            input={this.state.inputValue}
            updateLoading={this.updateLoading}
            updateData={this.updateData}
            updateArrAllPages={this.updateArrAllPages}
            updatePage={this.updatePage}
          />
            <ErrorButton
            updateError={this.updateError}/>
        </div>
        <div className="result-container">
          {this.state.loading ? (
            <div className="loading"></div>
          ) : (
            <div>
              <p className="result">Results:</p>
              <ItemPerson data={this.state.data} />
              {this.state.arrAllPages.length > 1 ? (
                <ButtonPage
                  arrAllPages={this.state.arrAllPages}
                  page={this.state.page}
                  input={this.state.inputValue}
                  updateLoading={this.updateLoading}
                  updateData={this.updateData}
                  updateArrAllPages={this.updateArrAllPages}
                  updatePage={this.updatePage}
                />
              ) : null}
            </div>
          )}
        </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
