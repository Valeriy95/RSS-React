import { IErrorButton } from '../types/types';

function ErrorButton (props: IErrorButton) {

  const handleButtonClick = () => {
    props.updateError(true);
  };

  return (
    <button className='button-error' onClick={handleButtonClick}>Ошибка</button>
  );
}

export default ErrorButton;