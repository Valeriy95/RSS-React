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

function ButtonPagination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.app.page);
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const lastPage = useSelector((state: RootState) => state.app.lastPage);

  const decrementPage = (p: number) => {
    dispatch(setLoading(true));
    if (p - 1 === 1) {
      dispatch(setPage(p - 1));
      removeStylePagesPrevious();
      navigate(`/${p - 1}`);
    }
    if (p > 1) {
      dispatch(setPage(p - 1));
      addStylePagesNext();
      navigate(`/${p - 1}`);
    }
    dispatch(setLoading(false));
  };

  const incrementPage = (p: number) => {
    dispatch(setLoading(true));
    if (p === (lastPage as number) - 1) {
      removeStylePagesNext();
      navigate(`/${p + 1}`);
    }
    if (p < (lastPage as number)) {
      if (p === 1) {
        dispatch(setPage(p + 1));
        addStylePagesPrevious();
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
    addStylePagesPrevious();
    removeStylePagesNext();
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
    addStylePagesNext();
    removeStylePagesPrevious();
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
    removeStylePagesPrevious();
    addStylePagesNext();
    navigateToStart();
  }

  const btnLastPage = document.querySelector('.last-page') as HTMLButtonElement;
  const btnNextPage = document.querySelector('.next-page') as HTMLButtonElement;
  const btnStartPage = document.querySelector(
    '.btn-start',
  ) as HTMLButtonElement;
  const btnPrevious = document.querySelector(
    '.btn-previous',
  ) as HTMLButtonElement;

  function removeStylePagesNext() {
    btnLastPage.disabled = true;
    btnLastPage.classList.remove('active-pagination');
    btnNextPage.disabled = true;
    btnNextPage.classList.remove('active-pagination');
  }

  function addStylePagesNext() {
    btnLastPage.disabled = false;
    btnLastPage.classList.add('active-pagination');
    btnNextPage.disabled = false;
    btnNextPage.classList.add('active-pagination');
  }

  function removeStylePagesPrevious() {
    btnStartPage.disabled = true;
    btnStartPage.classList.remove('active-pagination');
    btnPrevious.disabled = true;
    btnPrevious.classList.remove('active-pagination');
  }

  function addStylePagesPrevious() {
    btnStartPage.disabled = false;
    btnStartPage.classList.add('active-pagination');
    btnPrevious.disabled = false;
    btnPrevious.classList.add('active-pagination');
  }

  return (
    <div className="pagination">
      <div className="page btn-start" onClick={() => getStartPage(1)}>
        {'<<'}
      </div>
      <div
        className="page btn-previous"
        onClick={() => decrementPage(page as number)}
      >
        {'<'}
      </div>
      <div className="page">{`${page}`}</div>
      <button
        className="page active-pagination next-page"
        onClick={() => incrementPage(page as number)}
      >
        {'>'}
      </button>
      <button
        className="page active-pagination last-page"
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
