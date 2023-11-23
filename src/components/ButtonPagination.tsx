import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLastPage,
  setPage,
  setItemAllPages,
  setLoading,
  RootState,
} from '../slices/appSlice';
import { useState } from 'react';

function ButtonPagination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.app.page);
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const lastPage = useSelector((state: RootState) => state.app.lastPage);

  const [isLastPageActive, setLastPageActive] = useState(true);
  const [isNextPageActive, setNextPageActive] = useState(true);
  const [isStartPageActive, setStartPageActive] = useState(false);
  const [isPreviousPageActive, setPreviousPageActive] = useState(false);

  const decrementPage = (p: number) => {
    dispatch(setLoading(true));
    if (p - 1 === 1) {
      dispatch(setPage(p - 1));
      setStartPageActive(false);
      setNextPageActive(true);
      setLastPageActive(true);
      setPreviousPageActive(false);
      navigate(`/${p - 1}`);
    }
    if (p > 1) {
      dispatch(setPage(p - 1));
      setNextPageActive(true);
      setLastPageActive(true);
      navigate(`/${p - 1}`);
    }
    dispatch(setLoading(false));
  };

  const incrementPage = (p: number) => {
    dispatch(setLoading(true));
    if (p === (lastPage as number) - 1) {
      setLastPageActive(false);
      setNextPageActive(false);
      navigate(`/${p + 1}`);
    }
    if (p < (lastPage as number)) {
      if (p === 1) {
        dispatch(setPage(p + 1));
        setStartPageActive(true);
        setPreviousPageActive(true);
        navigate(`/${p + 1}`);
      } else {
        dispatch(setPage(p + 1));
        navigate(`/${p + 1}`);
      }
    }
    dispatch(setLoading(false));
  };

  const getLastPage = (itemPages: number) => {
    dispatch(setLoading(true));
    setStartPageActive(true);
    setNextPageActive(false);
    setLastPageActive(false);
    setPreviousPageActive(true);
    const itemsPages = itemPages;
    const totalCount = 1292;
    const lastPage = Math.ceil(totalCount / itemsPages);

    dispatch(setPage(lastPage));
    dispatch(setLoading(false));
    navigate(`/${lastPage}`);
  };

  const getStartPage = (itemPages: number) => {
    dispatch(setLoading(true));
    dispatch(setPage(itemPages));
    setStartPageActive(false);
    setNextPageActive(true);
    setLastPageActive(true);
    setPreviousPageActive(false);
    dispatch(setLoading(false));
    navigate('/1');
  };

  function navigateToStart() {
    navigate('/1');
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue: number = Number(event.target.value);
    dispatch(setItemAllPages(selectedValue));
    const totalCount = 1292;
    const updateLastPage = Math.ceil(totalCount / selectedValue);
    dispatch(setLastPage(updateLastPage));
    setStartPageActive(false);
    setNextPageActive(true);
    setLastPageActive(true);
    setPreviousPageActive(false);
    navigateToStart();
  }

  return (
    <div className="pagination">
      <div className={`page btn-start ${isStartPageActive ? 'active-pagination' : ''}`} onClick={() => getStartPage(1)}>
        {'<<'}
      </div>
      <div
        className={`page btn-previous ${isPreviousPageActive ? 'active-pagination' : ''}`}
        onClick={() => decrementPage(page as number)}
      >
        {'<'}
      </div>
      <div className="page">{`${page}`}</div>
      <button
        className={`page next-page ${isNextPageActive ? 'active-pagination' : ''}`}
        onClick={() => incrementPage(page as number)}
      >
        {'>'}
      </button>
      <button
        className={`page last-page ${isLastPageActive ? 'active-pagination' : ''}`}
        onClick={() => getLastPage(itemAllPages as number)}
      >
        {'>>'}
      </button>
      <select
        className="page active-pagination"
        id="mySelect"
        name="options"
        onChange={handleSelectChange}
      >
        <option className="page active-pagination" value="10">
          10
        </option>
        <option className="page active-pagination" value="20">
          20
        </option>
        <option className="page active-pagination" value="30">
          30
        </option>
      </select>
    </div>
  );
}

export default ButtonPagination;
