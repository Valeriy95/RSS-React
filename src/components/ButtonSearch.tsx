import '../style/style.css';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';

function ButtonSearch() {

  const {inputValue, itemAllPages, updateLoading, updateData, updateArrAllPages, updatePage} = useContext(Context)!;

  const navigate = useNavigate();
  const handleButtonClick = () => {
    updateLoading(true);
    localStorage.setItem('inputValue', inputValue as string);
    getPerson(inputValue as string, 0, itemAllPages as number).then((data) => {
      if (data) {
        if (inputValue === '') {
          updateData(data.results);
          updateArrAllPages(getAllPages(data.count));
        } else {
          updateData(data);
        }
        updatePage(1);
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
