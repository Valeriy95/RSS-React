import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { ITestData } from '../types/types';
import { useContext, useEffect, useState } from 'react';
import '../style/style.css';
import { getPokemon } from '../API/getPokemon';
import { Context } from '../App';

export function ItemComponent() {

  const {data, inputValue, itemAllPages, lastPage, updateData, updateArrAllPages, updatePage, updateSetDetailData, arrAllPages} = useContext(Context);

  const { 1: number } = useParams();
  const [isClosed, setIsClosed] = useState(true);
  const navigate = useNavigate();

  console.log(number);
  console.log(arrAllPages)

  useEffect(() => {  
    if (number === undefined) {
      // navigate('/1');
      navigate('/');
    } else if (
      Number.isNaN(Number(number)) ||
      Number(number) > lastPage
    ) {
      navigate('/error');
    } else {
      const pagination = document.querySelector('.pagination') as HTMLElement;
      pagination.classList.remove('hidden');
      updatePage(Number(number));
      const offset = (Number(number) - 1) * itemAllPages;
      getPerson(inputValue, offset, itemAllPages).then((data) => {
        if (data) {
          if (inputValue === '') {
            updateData(data.results);
            updateArrAllPages(getAllPages(data.count));
          } else {
            updateData(data);
            // updateArrAllPages([1]);
          }
        }
      });
    }
  }, [number]);

  function handlePageClick(e: ITestData) {
    console.log(e);

    if (e.url) {
      if (isClosed) {
        setIsClosed(false);
        getPokemon(e.url).then((data) => {
          if (data) {
            console.log(data);
            updateSetDetailData(data);
          }
        });
      } else {
        setIsClosed(true);
        navigate(`/${number}`);
      }
    } 
    else {
      if (isClosed) {
        setIsClosed(false);
        // updateSetDetailData(e);
        // getPokemon(e.species.url).then((data) => {
        //   if (data) {
        //     updateSetDetailData(data);
        //   }
        // });
      } else {
        setIsClosed(true);
        // navigate(`/${number}`);
      }
    }
  }

  return (
    <>
      <div>
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div
              onClick={() => handlePageClick(item)}
              className="description-person"
              key={index}
            >{`Name: ${item.name};`}</div>
          ))
        ) : (
          <div
            onClick={() => handlePageClick(data as ITestData)}
            className="description-person"
            key={1}
          >{`Name: ${data.name};`}</div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default ItemComponent;
