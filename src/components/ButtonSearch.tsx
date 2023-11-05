import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { IButtonSearch } from '../types/types';
import { useNavigate } from 'react-router-dom';

function ButtonSearch(props: IButtonSearch) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    props.updateLoading(true);
    localStorage.setItem('inputValue', props.input);
    getPerson(props.input, 0, props.itemAllPages).then((data) => {
      if (data) {
        Array.isArray(data)
          ? props.updateData(data.results)
          : props.updateData(data);
        props.updateArrAllPages(getAllPages(data.count));
        props.updatePage(1);
        navigate('/');
      } else {
        navigate('/error');
      }
      props.updateLoading(false);
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
