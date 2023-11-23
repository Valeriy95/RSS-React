import '../style/style.css';
import { useGetAllPokemonsQuery } from '../API/getAllPokemons';
import { getAllPages } from '../pagination/getAllPages';
import {
  setPage,
  setLoading,
  setData,
  setArrAllPages,
  setInputValue,
  RootState,
  setError,
} from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IAllPokemons, Pokemon } from '../API/types/apiTypes';

function ButtonSearch() {
  const dispatch = useDispatch();
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const inputValue = useSelector((state: RootState) => state.app.inputValue);
  const inputCurrentValue = useSelector(
    (state: RootState) => state.app.inputCurrentValue,
  );

  const { data, error } = useGetAllPokemonsQuery({
    text: inputValue,
    item: 0,
    lim: itemAllPages,
  });

  const handleButtonClick = () => {
    dispatch(setLoading(true));
    localStorage.setItem('inputValue', inputCurrentValue);
    dispatch(setInputValue(inputCurrentValue));
    if (data) {
      const dataAllPokemons = data as IAllPokemons;
      if (inputValue === '') {
          dispatch(setData(dataAllPokemons.results));
          dispatch(setArrAllPages(getAllPages(dataAllPokemons.count)));
      } else {
        dispatch(setData(data as Pokemon));
      }
      dispatch(setPage(1));
    } else if (error) {
      dispatch(setError(true));
    }

    dispatch(setLoading(false));
  };

  return (
    <>
      <button className="button-search" onClick={handleButtonClick}>
        Поиск
      </button>
    </>
  );
}

export default ButtonSearch;
