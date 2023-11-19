import { useEffect } from 'react';
import { useGetAllPokemonsQuery } from './API/getAllPokemons';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import InputNew from './components/Input';
import ButtonSearch from './components/ButtonSearch';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ItemComponent } from './components/ItemComponent';
import { ErrorComponent } from './components/ErrorComponent';
import Description from './components/Description';
import ButtonPagination from './components/ButtonPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setArrAllPages,
  setData,
  setInputValue,
  setLoading,
} from './slices/appSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    inputValue,
    detailData,
    loading,
    arrAllPages,
    page,
    itemAllPages,
    error,
  } = useSelector((state: RootState) => state.app);

  const { data: responseData, error: responseError } = useGetAllPokemonsQuery({
    text: inputValue,
    item: 0,
    lim: itemAllPages,
  });

  useEffect(() => {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue !== null) {
      dispatch(setInputValue(storedValue));
    }

    dispatch(setLoading(true));

    if (responseData) {
      if (inputValue === '') {
        dispatch(setData(responseData.results));
        dispatch(setArrAllPages(getAllPages(responseData.count)));
      } else {
        dispatch(setData(responseData));
      }
    }

    dispatch(setLoading(false));

    if (detailData) {
      navigate(`${page}/details`);
    }
  }, [detailData, responseData, page]);

  useEffect(() => {
    if (responseError) {
      navigate('/error');
    }
  }, [responseError]);

  return (
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
                      element={<ItemComponent />}
                    >
                      <Route path="details" element={<Description />} />
                    </Route>
                  ))}
                  <Route path="error" element={<ErrorComponent />} />
                </Routes>
              </div>
            </div>
          )}
          <div>{arrAllPages.length > 1 ? <ButtonPagination /> : null}</div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
