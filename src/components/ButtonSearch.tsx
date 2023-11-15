import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { useNavigate } from 'react-router-dom';
import {
  setPage,
  setLoading,
  setData,
  setArrAllPages,
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

  const handleButtonClick = () => {
    dispatch(setLoading(true));
    localStorage.setItem('inputValue', inputValue as string);
    getPerson(inputValue as string, 0, itemAllPages as number).then((data) => {
      if (data) {
        if (inputValue === '') {
          dispatch(setData(data.results));
          dispatch(setArrAllPages(getAllPages(data.count)));
        } else {
          dispatch(setData(data));
        }
        dispatch(setPage(1));
      } else {
        navigate('/error');
      }
      dispatch(setLoading(false));
    });
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
