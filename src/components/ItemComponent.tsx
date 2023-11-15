import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { ITestData } from '../types/types';
import { useEffect, useState } from 'react';
import '../style/style.css';
import { getPokemon } from '../API/getPokemon';
import {
  setPage,
  setData,
  setArrAllPages,
  setDetailData,
  RootState,
} from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

export function ItemComponent() {
  const { 1: number } = useParams();
  const [isClosed, setIsClosed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.app.data);
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const lastPage = useSelector((state: RootState) => state.app.lastPage);
  const arrAllPages = useSelector((state: RootState) => state.app.arrAllPages);
  const inputValue = useSelector((state: RootState) => state.app.inputValue);

  console.log(number);
  console.log(arrAllPages);

  useEffect(() => {
    if (number === undefined) {
      navigate('/');
    } else if (
      Number.isNaN(Number(number)) ||
      Number(number) > (lastPage as number)
    ) {
      navigate('/error');
    } else {
      const pagination = document.querySelector('.pagination') as HTMLElement;
      pagination.classList.remove('hidden');
      dispatch(setPage(Number(number)));
      const offset = (Number(number) - 1) * (itemAllPages as number);
      getPerson(inputValue as string, offset, itemAllPages as number).then(
        (dataResponse) => {
          if (dataResponse) {
            if (inputValue === '') {
              dispatch(setData(dataResponse.results));
              dispatch(setArrAllPages(getAllPages(dataResponse.count)));
            } else {
              dispatch(setData(dataResponse));
            }
          }
        },
      );
    }
  }, [number]);

  function handlePageClick(e: ITestData) {
    console.log(e);

    if (e.url) {
      if (isClosed) {
        setIsClosed(false);
        getPokemon(e.url).then((dataResponse) => {
          if (dataResponse) {
            dispatch(setDetailData(dataResponse));
          }
        });
      } else {
        setIsClosed(true);
        navigate(`/${number}`);
      }
    } else {
      if (isClosed) {
        setIsClosed(false);
      } else {
        setIsClosed(true);
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
