import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { IButtonSearch } from '../types/types';

function ButtonSearch(props: IButtonSearch) {
  const handleButtonClick = () => {
    props.updateLoading(true);
    localStorage.setItem('inputValue', props.input);
    getPerson(props.input).then((data) => {
      props.updatePage(1);
      if (data) {
        props.updateData(data.results);
        props.updateArrAllPages(getAllPages(data.count));
      }
      props.updateLoading(false);
    });
  };

  return (
    <>
      <button onClick={handleButtonClick}>Поиск</button>
    </>
  );
}

export default ButtonSearch;
