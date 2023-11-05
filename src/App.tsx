import { useState, useEffect } from 'react';
import { getPerson } from './API/getPerson';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import ItemPerson from './components/ItemPerson';
import InputNew from './components/InputNew';
import ButtonSearch from './components/ButtonSearch';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';
import { DataPerson, IPerson } from './types/types';
import { Routes, Route } from 'react-router-dom';
import { ItemComponent } from './components/ItemComponent';
import { ErrorComponent } from './components/ErrorComponent';
import ButtonTest from './components/ButtonTest';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [arrAllPages, setArrAllPages] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [itemAllPages, setItemAllPages] = useState(10);
  const [lastPage, setLastPage] = useState(130);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue !== null) {
      setInputValue(storedValue);
    }

    setLoading(true);

    getPerson(inputValue, offset, itemAllPages).then((data) => {
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

  const updateData = (newData: DataPerson) => {
    // if (Array.isArray(newData)) {
    //   // Вызываем `updateData` только с `IPerson[]`
    //   updateData(newData);
    // } else {
    //   // Если `newData` не является массивом, выполните соответствующую обработку
    // }
    if (Array.isArray(newData)) {
      setData(newData);
    } else {
      setData([newData]);
    }
    // setData(newData);
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

  const updateSetOffset = (pages: number) => {
    setOffset(pages);
  };

  return (
    <div>
      <ErrorBoundary error={error}>
        <div>
          <InputNew input={inputValue} updateInput={updateInput} />
          <ButtonSearch
            input={inputValue}
            itemAllPages={itemAllPages}
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
              <Routes>
                <Route path="/" element={<ItemPerson data={data} />} />
                {arrAllPages.map((page) => (
                  <Route
                    key={page}
                    path={`/:${page}`}
                    element={
                      <ItemComponent
                        num={page}
                        data={data}
                        arrAllPages={arrAllPages}
                        page={page}
                        input={inputValue}
                        itemAllPages={itemAllPages}
                        lastPage={lastPage}
                        updateLoading={updateLoading}
                        updateData={updateData}
                        updateArrAllPages={updateArrAllPages}
                        updatePage={updatePage}
                        updateItemAllPages={updateItemAllPages}
                        updateSetLastPage={updateSetLastPage}
                        updateSetOffset={updateSetOffset}
                      />
                    }
                  />
                ))}
                <Route path="error" element={<ErrorComponent />} />
              </Routes>
            </div>
          )}
          <div>
            {arrAllPages.length > 1 ? (
              <ButtonTest
                arrAllPages={arrAllPages}
                page={page}
                input={inputValue}
                itemAllPages={itemAllPages}
                lastPage={lastPage}
                updateLoading={updateLoading}
                updateData={updateData}
                updateArrAllPages={updateArrAllPages}
                updatePage={updatePage}
                updateItemAllPages={updateItemAllPages}
                updateSetLastPage={updateSetLastPage}
              />
            ) : null}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
