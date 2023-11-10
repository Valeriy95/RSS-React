import { useState, useEffect } from 'react';
import { getPerson } from './API/getPerson';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import InputNew from './components/InputNew';
import ButtonSearch from './components/ButtonSearch';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';
import { DataPerson, IContext, Pokemon } from './types/types';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ItemComponent } from './components/ItemComponent';
import { ErrorComponent } from './components/ErrorComponent';
import Description from './components/Description';
import ButtonPagination from './components/ButtonPagination';
import React from 'react';

export const Context = React.createContext<IContext>();

function App() {
  const [inputValue, setInputValue] = useState<string>(localStorage.getItem('inputValue') || '');
  const [detailData, setDetailData] = useState<Pokemon>();
  const [data, setData] = useState<DataPerson>([]);
  const [loading, setLoading] = useState(false);
  const [arrAllPages, setArrAllPages] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [itemAllPages, setItemAllPages] = useState(10);
  const [lastPage, setLastPage] = useState(130);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue !== null) {
      setInputValue(storedValue);
    }

    setLoading(true);

    getPerson(inputValue, 0, itemAllPages).then((data) => {
      if (data) {
        if (inputValue === '') {
          setData(data.results);
          setArrAllPages(getAllPages(data.count));
        } else {
          setData(data);
          // setArrAllPages([1]);
        }
      }

      setLoading(false);
    });

    if (detailData) {
      navigate(`${page}/details`);
    }
  }, [detailData]);

  const updateLoading = (newLoading: boolean) => {
    setLoading(newLoading);
  };

  const updateData = (newData: DataPerson) => {
    if (Array.isArray(newData)) {
      setData(newData);
    } else {
      setData(newData);
    }
  };

  const updateArrAllPages = (newArrAllPages: number[]) => {
    setArrAllPages(newArrAllPages);
  };

  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  const updateInput = (newInput: string) => {
    setInputValue(newInput);
  };

  const updateError = (newEr: boolean) => {
    setError(newEr);
  };

  const updateItemAllPages = (item: number) => {
    setItemAllPages(item);
  };

  const updateSetLastPage = (pages: number) => {
    setLastPage(pages);
  };

  const updateSetDetailData = (data: Pokemon) => {
    setDetailData(data);
  };

  return (
    <Context.Provider value={{inputValue, error, updateInput, itemAllPages, updateLoading, updateData, updateArrAllPages, updatePage, updateError, data, lastPage, updateSetDetailData, detailData, page, updateItemAllPages, updateSetLastPage, arrAllPages}}>
    <div>
      <ErrorBoundary error={error}>
        <div>
          <InputNew />
          <ButtonSearch />
          <ErrorButton />
        </div>
        <div className="result-container">
          {loading ? (
            <div className="loading"></div>
          ) : (
            <div>
              <p className="result">Results:</p>
              <div className="routes-container">
              <Routes>
                <Route path="/" element={<ItemComponent />} />
                
                {arrAllPages.map((page) => (
                  <Route
                    key={page}
                    path={`/:${page}`}
                    element={
                      <ItemComponent />
                    }
                  >
                    <Route path="details" element={<Description />} />
                  </Route>
                ))}
                <Route path="error" element={<ErrorComponent />} />
              </Routes>
              </div>
            </div>
          )}
          <div>
            {arrAllPages.length > 1 ? (
              <ButtonPagination />
            ) : null}
          </div>
        </div>
      </ErrorBoundary>
    </div>
    </Context.Provider>
  );
}

export default App;
