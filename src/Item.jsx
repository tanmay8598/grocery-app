import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

const Item = ({ text, id, deleteItem, editItem }) => {
  return (
    <div className='item-list' key={id}>
      <p className='item-name'>{text}</p>
      <div className='btn-container'>
        <button
          className='edit-btn'
          onClick={() => {
            editItem(id)
          }}
        >
          <FaEdit />
        </button>
        <button
          className='delete-btn'
          onClick={() => {
            deleteItem(id)
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default Item
