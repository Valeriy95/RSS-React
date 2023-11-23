import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClosed, setDetailData, RootState } from '../slices/appSlice';

export function Description() {
  const detailData = useSelector(
    (state: RootState) => state.app.detailData,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { 1: number } = useParams();

  const closeDetail = () => {
    dispatch(setIsClosed(true));
    dispatch(setDetailData(null));
    navigate(`/${number}`);
  };

  return (
    <>
     {detailData ? (
      <div className="description-container">
        <h4>Name: {detailData.name}</h4>
        <p>HP: {detailData.stats[0].base_stat}</p>
        <p>Attack: {detailData.stats[1].base_stat}</p>
        <p>Defense: {detailData.stats[2].base_stat}</p>
        <p>Special-Attack: {detailData.stats[3].base_stat}</p>
        <p>Special-Defense: {detailData.stats[4].base_stat}</p>
        <p>Speed: {detailData.stats[5].base_stat}</p>
        <button className="btn-close" type="button" onClick={closeDetail}>
          Close
        </button>
      </div>
     ) : (
      null
     )}
    </>
  );
}

export default Description;
