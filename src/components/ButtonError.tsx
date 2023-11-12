import { useContext } from 'react';
import { Context } from '../App';

function ErrorButton() {

  const {updateError} = useContext(Context)!;


  const handleButtonClick = () => {
    updateError(true);
  };

  return (
    <button className="button-error" onClick={handleButtonClick}>
      Ошибка
    </button>
  );
}

export default ErrorButton;
