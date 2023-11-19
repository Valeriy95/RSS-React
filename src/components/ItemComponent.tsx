import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetAllPokemonsQuery } from '../API/getAllPokemons';
import { getAllPages } from '../pagination/getAllPages';
import { ITestData, Pokemon } from '../types/types';
import { useEffect } from 'react';
import '../style/style.css';
import { getPokemon } from '../API/getPokemon';
import {
  setPage,
  setData,
  setArrAllPages,
  setDetailData,
  setIsClosed,
  setLoading,
  RootState,
} from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

export function ItemComponent() {
  const { 1: number } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.app.data);
  const itemAllPages = useSelector(
    (state: RootState) => state.app.itemAllPages,
  );
  const lastPage = useSelector((state: RootState) => state.app.lastPage);
  const inputValue = useSelector((state: RootState) => state.app.inputValue);
  const page = useSelector((state: RootState) => state.app.page);
  const isClosed = useSelector((state: RootState) => state.app.isClosed);

  const offset = (Number(number) - 1) * (itemAllPages as number);

  const { data: responseData } = useGetAllPokemonsQuery({
    text: inputValue,
    item: offset,
    lim: itemAllPages,
  });

  useEffect(() => {
    if (number === undefined) {
      navigate('/1');
    } else if (
      Number.isNaN(Number(number)) ||
      Number(number) > (lastPage as number)
    ) {
      navigate('/error');
    } else {
      dispatch(setLoading(true));
      const pagination = document.querySelector('.pagination') as HTMLElement;
      pagination.classList.remove('hidden');
      dispatch(setPage(Number(number)));
      if (responseData) {
        if (inputValue === '') {
          dispatch(setData(responseData.results));
          dispatch(setArrAllPages(getAllPages(responseData.count)));
        } else {
          dispatch(setData(responseData));
        }
      }
      dispatch(setLoading(false));
    }
  }, [data, responseData, page]);

  function handlePageClickArr(e: ITestData) {
    if (e.url) {
      if (isClosed) {
        dispatch(setIsClosed(false));
        getPokemon(e.url).then((pokemonData) => {
          if (pokemonData) {
            dispatch(setDetailData(pokemonData));
          }
        });
      } else {
        dispatch(setIsClosed(true));
        dispatch(setDetailData(null));
        navigate(`/${number}`);
      }
    }
  }

  function handlePageClick(dataPokem: Pokemon) {
    if (isClosed) {
      dispatch(setDetailData(dataPokem));
      dispatch(setIsClosed(false));
    } else {
      dispatch(setDetailData(null));
      dispatch(setIsClosed(true));
    }
  }

  return (
    <>
      <div>
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div
              onClick={() => handlePageClickArr(item)}
              className="description-person"
              key={index}
            >{`Name: ${item.name};`}</div>
          ))
        ) : (
          <div
            onClick={() => handlePageClick(data as Pokemon)}
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
