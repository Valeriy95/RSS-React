import { useNavigate, useParams } from 'react-router-dom';
import { IDetailData } from '../types/types';

export function Description(props: IDetailData) {
  console.log(props);
  const navigate = useNavigate();
  const { 1: number } = useParams();

  const closeDetail = () => {
    navigate(`/${number}`);
  };

  return (
    <>
      <div className="description-container">
        <h4>Name: {props.detailData?.name}</h4>
        <p>HP: {props.detailData?.stats[0].base_stat}</p>
        <p>Attack: {props.detailData?.stats[1].base_stat}</p>
        <p>Defense: {props.detailData?.stats[2].base_stat}</p>
        <p>Special-Attack: {props.detailData?.stats[3].base_stat}</p>
        <p>Special-Defense: {props.detailData?.stats[4].base_stat}</p>
        <p>Speed: {props.detailData?.stats[5].base_stat}</p>
        <button className="btn-close" type="button" onClick={closeDetail}>
          Close
        </button>
      </div>
    </>
  );
}

export default Description;
