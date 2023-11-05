import { getAllPages } from '../pagination/getAllPages';
import { changePage } from '../pagination/changePage';
import '../style/style.css';
import { IButtonPage } from '../types/types';

function ButtonPage(props: IButtonPage) {
  const handlePageClick = (p: number) => {
    props.updateLoading(true);
    changePage(props.input, p).then((data) => {
      props.updateData(data.results);
      props.updateArrAllPages(getAllPages(data.count));
      props.updatePage(p);
      props.updateLoading(false);
    });
  };

  return (
    <div className="page-container">
      {props.arrAllPages.map((p) => (
        <span
          onClick={() => handlePageClick(p)}
          key={p}
          className={props.page === p ? 'page page_current' : 'page'}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default ButtonPage;
