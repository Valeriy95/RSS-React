import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { IItemComponents, ITestData } from '../types/types';
import { useEffect, useState } from 'react';
import '../style/style.css';
import { getPokemon } from '../API/getPokemon';

export function ItemComponent(props: IItemComponents) {
  const { 1: number } = useParams();
  const [isClosed, setIsClosed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.data);
    if (number === undefined) {
      navigate('/1');
    } else if (
      Number.isNaN(Number(number)) ||
      Number(number) > props.lastPage
    ) {
      navigate('/error');
    } else {
      const pagination = document.querySelector('.pagination') as HTMLElement;
      pagination.classList.remove('hidden');
      props.updatePage(Number(number));
      const offset = (Number(number) - 1) * props.itemAllPages;
      getPerson(props.input, offset, props.itemAllPages).then((data) => {
        if (data) {
          props.updateData(data.results);
          props.updateArrAllPages(getAllPages(data.count));
        }
      });
    }
  }, [number]);

  function handlePageClick(e: ITestData) {
    if (isClosed) {
      setIsClosed(false);
      getPokemon(e.url).then((data) => {
        if (data) {
          props.updateSetDetailData(data);
        }
      });
    } else {
      setIsClosed(true);
      navigate(`/${number}`);
    }
  }

  return (
    <>
      <div>
        {Array.isArray(props.data) ? (
          props.data.map((item, index) => (
            <div
              onClick={() => handlePageClick(item)}
              className="description-person"
              key={index}
            >{`Name: ${item.name};`}</div>
          ))
        ) : (
          <div
            onClick={() => handlePageClick(props.data as ITestData)}
            className="description-person"
            key={1}
          >{`Name: ${props.data.name};`}</div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default ItemComponent;
