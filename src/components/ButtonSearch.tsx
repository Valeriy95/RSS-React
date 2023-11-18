import '../style/style.css';
import { useGetPersonQuery } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { useNavigate } from 'react-router-dom';
import {
  setPage,
  setLoading,
  setData,
  setArrAllPages,
  setInputValue,
  RootState,
} from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

function ButtonSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const inputValue = useSelector((state: RootState) => state.app.inputValue);
  const inputCurrentValue = useSelector((state: RootState) => state.app.inputCurrentValue);

  const { data, error } = useGetPersonQuery({
    text: inputValue as string,
    item: 0,
    lim: itemAllPages as number,
  });

  const handleButtonClick = () => {
    dispatch(setLoading(true));
    localStorage.setItem('inputValue', inputCurrentValue as string);
    dispatch(setInputValue(inputCurrentValue));

    if (data) {
      if (inputValue === '') {
        dispatch(setData(data.results));
        dispatch(setArrAllPages(getAllPages(data.count)));
      } else {
        dispatch(setData(data));
      }
      dispatch(setPage(1));
    } else if (error) {
      navigate('/error');
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
