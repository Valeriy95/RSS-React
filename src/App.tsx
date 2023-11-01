import { useState, useEffect } from 'react';
import { getPerson } from './API/getPerson';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import ButtonPage from './components/ButtonPage';
import ItemPerson from './components/ItemPerson';
import InputNew from './components/InputNew';
import ButtonSearch from './components/ButtonSearch';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';
import { IPerson } from './types/types';


function App() {
  // const [inputValue, setInputValue] = useState(localStorage.getItem('inputValue') || '');
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [arrAllPages, setArrAllPages] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue !== null) {
      setInputValue(storedValue);
    }

    setLoading(true);

    getPerson(inputValue).then((data) => {
      if (data) {
        setData(data.results);
        setArrAllPages(getAllPages(data.count));
      }

      setLoading(false);
    });
  }, []);


  const updateLoading = (newLoading: boolean) => {
    setLoading(newLoading);
  };

  const updateData = (newData: IPerson[]) => {
    setData(newData);
  };

  const updateArrAllPages = (newArrAllPages: number[]) => {
    setArrAllPages(newArrAllPages);
  };

  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  const updateInput = (newInput: string) => {
    console.log(newInput);
    setInputValue(newInput);
  };

  const updateError = (newEr: boolean) => {
    setError(newEr);
  };

  return (
    <div>
      <ErrorBoundary error={error}>
        <div>
          <InputNew input={inputValue} updateInput={updateInput} />
          <ButtonSearch
            input={inputValue}
            updateLoading={updateLoading}
            updateData={updateData}
            updateArrAllPages={updateArrAllPages}
            updatePage={updatePage}
          />
          <ErrorButton updateError={updateError} />
        </div>
        <div className="result-container">
          {loading ? (
            <div className="loading"></div>
          ) : (
            <div>
              <p className="result">Results:</p>
              <ItemPerson data={data} />
              {arrAllPages.length > 1 ? (
                <ButtonPage
                  arrAllPages={arrAllPages}
                  page={page}
                  input={inputValue}
                  updateLoading={updateLoading}
                  updateData={updateData}
                  updateArrAllPages={updateArrAllPages}
                  updatePage={updatePage}
                />
              ) : null}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;

