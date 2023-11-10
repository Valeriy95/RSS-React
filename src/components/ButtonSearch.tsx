import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';

function ButtonSearch() {

  const {inputValue, itemAllPages, updateLoading, updateData, updateArrAllPages, updatePage} = useContext(Context);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    updateLoading(true);
    localStorage.setItem('inputValue', inputValue);
    getPerson(inputValue, 0, itemAllPages).then((data) => {
      if (data) {
        if (inputValue === '') {
          updateData(data.results);
          updateArrAllPages(getAllPages(data.count));
        } else {
          updateData(data);
          updateArrAllPages([1]);
        }
        updatePage(1);
        // navigate('/1');
      } else {
        navigate('/error');
      }
      updateLoading(false);
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
