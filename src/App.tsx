import { useEffect } from 'react';
import { useGetAllPokemonsQuery } from './API/getAllPokemons';
import './App.css';
import './style/style.css';
import { getAllPages } from './pagination/getAllPages';
import SearchInput from './components/SearchInput';
import ButtonSearch from './components/ButtonSearch';
import ErrorButton from './components/ButtonError';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ItemComponent } from './components/ItemComponent';
import Description from './components/Description';
import ButtonPagination from './components/ButtonPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setArrAllPages,
  setData,
  setError,
  setInputValue,
  setLoading,
} from './slices/appSlice';
import { IAllPokemons, Pokemon } from './API/types/apiTypes';

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
        const dataAllPokemons = responseData as IAllPokemons;
        dispatch(setData(dataAllPokemons.results));
        dispatch(setArrAllPages(getAllPages(dataAllPokemons.count)));
      } else {
        dispatch(setData(responseData as Pokemon));
      }
    }

    dispatch(setLoading(false));

    if (detailData) {
      navigate(`${page}/details`);
    }
  }, [detailData, responseData, page]);

  useEffect(() => {
    if (responseError) {
      dispatch(setError(true));
    }
  }, [responseError]);

  function updateNavigation (num: number) {
    navigate(`${num}`)
  }

  function updateInput (str: string) {
    dispatch(setInputValue(str));
  }

  function updateError (str: boolean) {
    dispatch(setError(str));
  }

  return (
    <>
      <ErrorBoundary error={error} updateError={updateError} updateInput={updateInput} updateNavigation={updateNavigation}>
        <>
          <SearchInput />
          <ButtonSearch />
          <ErrorButton />
        </>
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
                </Routes>
              </div>
            </div>
          )}
          <div>{arrAllPages.length > 1 ? <ButtonPagination /> : null}</div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
