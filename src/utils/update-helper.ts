import {BasicType} from '../types/basic-type';

const updateItem = <Item extends BasicType>(
  newItem: Item,
  itemArray: Item[]
) => {
  const index = itemArray.findIndex(({_id}) => _id === newItem._id);

  if (index > -1) {
    return [
      ...itemArray.slice(0, index),
      newItem,
      ...itemArray.slice(index + 1, itemArray.length),
    ];
  }

  return itemArray;
};

const deleteItem = <Item extends BasicType>(
  deleteId: BasicType['_id'],
  itemArray: Item[]
) => {
  const index = itemArray.findIndex(({_id}) => _id === deleteId);

  if (index > -1) {
    return [...itemArray.splice(index, 1)];
  }

  return itemArray;
};

export {updateItem, deleteItem};
