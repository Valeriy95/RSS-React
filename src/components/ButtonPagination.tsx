import { getAllPages } from '../pagination/getAllPages';
import '../style/style.css';
import { IButtonPage } from '../types/types';
import { getPerson } from '../API/getPerson';
import { useNavigate } from 'react-router-dom';

function ButtonPagination(props: IButtonPage) {
  const navigate = useNavigate();

  const decrementPage = (p: number) => {
    if (p - 1 === 1) {
      removeStylePagesPrevious();
      navigate(`/${p - 1}`);
    }
    if (p > 1) {
      props.updatePage(p - 1);
      addStylePagesNext();
      navigate(`/${p - 1}`);
    }
  };

  const incrementPage = (p: number) => {
    console.log(p);
    if (p === props.lastPage - 1) {
      removeStylePagesNext();
      navigate(`/${p + 1}`);
    }
    if (p < props.lastPage) {
      if (p === 1) {
        addStylePagesPrevious();
        navigate(`/${p + 1}`);
      }
      props.updatePage(p + 1);
      navigate(`/${p + 1}`);
    }
  };

  const getLastPage = (itemPages: number) => {
    addStylePagesPrevious();
    removeStylePagesNext();
    const itemsPages = itemPages;
    const totalCount = 1292;
    const lastPage = Math.ceil(totalCount / itemsPages);

    props.updatePage(lastPage);
    navigate(`/${lastPage}`);
  };

  const getStartPage = (itemPages: number) => {
    props.updatePage(itemPages);
    addStylePagesNext();
    removeStylePagesPrevious();
    navigate('/1');
  };

  function navigateToStart() {
    navigate('/1');
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue: number = Number(event.target.value);
    props.updateItemAllPages(selectedValue);
    const totalCount = 1292;
    const updateLastPage = Math.ceil(totalCount / selectedValue);
    props.updateSetLastPage(updateLastPage);
    removeStylePagesPrevious();
    addStylePagesNext();

    props.updateLoading(true);

    getPerson(props.input, 0, selectedValue).then((data) => {
      props.updatePage(1);
      if (data) {
        props.updateData(data.results);
        props.updateArrAllPages(getAllPages(data.count));
      }
      props.updateLoading(false);
    });
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
        onClick={() => decrementPage(props.page)}
      >
        {'<'}
      </div>
      <div className="page">{`${props.page}`}</div>
      <button
        className="page active-pagination next-page"
        onClick={() => incrementPage(props.page)}
      >
        {'>'}
      </button>
      <button
        className="page active-pagination last-page"
        onClick={() => getLastPage(props.itemAllPages)}
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
