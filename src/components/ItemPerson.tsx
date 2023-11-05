import '../style/style.css';
import { IItemPerson, IPerson } from '../types/types';

function ItemPerson(props: IItemPerson) {
  console.log(props.data);
  return (
    <>
      {Array.isArray(props.data) ? (
        props.data.map((item, index) => (
          <div
            className="description-person"
            key={index}
          >{`Name: ${item.name};`}</div>
        ))
      ) : (
        <div
          className="description-person"
          key={1}
        >{`Name: ${props.data.name};`}</div>
      )}
    </>
  );
}

export default ItemPerson;
