import React from 'react';
import '../style/style.css';
import { IItemPerson } from '../types/types';

class ItemPerson extends React.Component<IItemPerson> {
  constructor(props: IItemPerson) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.data.map((item, index) => (
          <div className="description-person" key={index}>{`Name: ${item.name}; Height: ${item.height}; Mass: ${
            item.mass
          }; Hair rcolor: ${item.hair_color}; Eye color: ${
            item.eye_color
          }`}</div>
        ))}
      </>
    );
  }
}

export default ItemPerson;
