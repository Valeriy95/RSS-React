import { useDispatch } from 'react-redux';
import { setError } from '../slices/appSlice';

function ErrorButton() {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setError(true));
  };

  return (
    <button className="button-error" onClick={handleButtonClick}>
      Ошибка
    </button>
  );
}

export default ErrorButton;
