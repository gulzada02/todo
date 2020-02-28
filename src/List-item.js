import React from 'react';

const ListItem = ({item, updateTodo, deleteTodo})=>{
  return(
    <li
        key={item.id}
        className="list-group-item"
      >
        {item.name}
        <button
          className="btn btn-info btn-sm ml-4"
          onClick={updateTodo}
        >U</button>
        <button
          className="btn btn-danger btn-sm ml-4"
          onClick={deleteTodo}
        >X</button>
      </li>
  )
}

export default ListItem;