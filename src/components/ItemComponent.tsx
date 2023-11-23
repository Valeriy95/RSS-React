import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { api, useGetAllPokemonsQuery } from '../API/getAllPokemons';
import { getAllPages } from '../pagination/getAllPages';
import { useEffect } from 'react';
import '../style/style.css';
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
import { IAllPokemons, IPokemonsResults, Pokemon } from '../API/types/apiTypes';

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

  const offset = (Number(number) - 1) * itemAllPages;

  const { data: responseData } = useGetAllPokemonsQuery({
    text: inputValue,
    item: offset,
    lim: itemAllPages,
  });

  const [trigger] = api.endpoints.getPokemon.useLazyQuery();

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
          const dataAllPokemons = responseData as IAllPokemons;
          dispatch(setData(dataAllPokemons.results));
          dispatch(setArrAllPages(getAllPages(dataAllPokemons.count)));
        } else {
          dispatch(setData(responseData as Pokemon));
        }
      }
      dispatch(setLoading(false));
    }
  }, [data, responseData, page]);

    function handlePageClickArr(e: IPokemonsResults) {
    if (e.url) {
      const match = e.url.match(/\/(\d+\/)$/) as RegExpMatchArray;
      const idPokemon = match[1];
      if (isClosed) {
        dispatch(setIsClosed(false));
        trigger(idPokemon)
        .unwrap()
        .then((pokemonData) => {
          dispatch(setDetailData(pokemonData));
        })
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
