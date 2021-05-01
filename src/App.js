import React, { useState, useEffect } from "react"
import Item from "./Item"
import Alert from "./Alert"

const getLocalStorage = () => {
  let list = localStorage.getItem("items")
  if (list) {
    return JSON.parse(localStorage.getItem("items"))
  } else {
    return []
  }
}

const App = () => {
  const [items, setItems] = useState(getLocalStorage())
  const [itemName, setItemName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" })

  function saveItems(newItem) {
    // when editing
    if (itemName && isEditing) {
      setItems(
        items.map((item, index) => {
          if (index === editID) {
            return itemName
          }
          return item
        })
      )
      showAlert(true, "sucess", "Value changed")
      setItemName("")
      setEditID(null)
      setIsEditing(false)
    } else if (!itemName) {
      showAlert(true, "danger", "Please enter value")
    } else {
      setItems((prevItems) => {
        return [...prevItems, itemName]
      })
      showAlert(true, "success", "Item added to the list")
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id
      })
    })
  }

  function editItem(id) {
    const specificItem = items.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setItemName(specificItem)
  }

  const clearList = () => {
    showAlert(true, "danger", "empty list")
    setItems([])
  }

  return (
    <div className='box'>
      <div className='card'>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} items={items} />
        )}
        <h2 className='heading'>Grocery Bud</h2>
        <div className='input-section'>
          <input
            type='text'
            placeholder='e.g. eggs'
            onChange={(e) => {
              setItemName(e.target.value)
            }}
            value={itemName}
          />
          <button
            className='submit-btn'
            onClick={(e) => {
              e.preventDefault()
              saveItems(itemName)
            }}
          >
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </div>
      {items.map((item, index) => {
        return (
          <Item
            key={index}
            id={index}
            text={item}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        )
      })}
      <div className='clear-btn-container'>
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>
    </div>
  )
}

export default App
