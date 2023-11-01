import '../style/style.css';
import { IItemPerson } from '../types/types';

function ItemPerson (props: IItemPerson) {

  return (
    <>
      {props.data.map((item, index) => (
        <div className="description-person" key={index}>{`Name: ${item.name}; Height: ${item.height}; Mass: ${
          item.mass
        }; Hair rcolor: ${item.hair_color}; Eye color: ${
          item.eye_color
        }`}</div>
      ))}
    </>
  );
}

export default ItemPerson;
