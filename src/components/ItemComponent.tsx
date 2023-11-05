import { useNavigate, useParams } from 'react-router-dom';
import { getPerson } from '../API/getPerson';
import { getAllPages } from '../pagination/getAllPages';
import { ITest } from '../types/types';
import { useEffect } from 'react';
import '../style/style.css';

export function ItemComponent(props: ITest) {
  const { 1: number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (Number.isNaN(Number(number)) || Number(number) > props.lastPage) {
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

  return (
    <>
      {props.data.map((item, index) => (
        <div
          className="description-person"
          key={index}
        >{`Name: ${item.name};`}</div>
      ))}
    </>
  );
}

export default ItemComponent;
