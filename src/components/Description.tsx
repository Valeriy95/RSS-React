import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';

export function Description() {

  const { detailData } = useContext(Context);

  const navigate = useNavigate();
  const { 1: number } = useParams();

  const closeDetail = () => {
    navigate(`/${number}`);
  };

  return (
    <>
      <div className="description-container">
        <h4>Name: {detailData?.name}</h4>
        <p>HP: {detailData?.stats[0].base_stat}</p>
        <p>Attack: {detailData?.stats[1].base_stat}</p>
        <p>Defense: {detailData?.stats[2].base_stat}</p>
        <p>Special-Attack: {detailData?.stats[3].base_stat}</p>
        <p>Special-Defense: {detailData?.stats[4].base_stat}</p>
        <p>Speed: {detailData?.stats[5].base_stat}</p>
        <button className="btn-close" type="button" onClick={closeDetail}>
          Close
        </button>
      </div>
    </>
  );
}

export default Description;
