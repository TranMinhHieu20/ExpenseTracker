import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="">
      <p className="dark:text-white text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button className="card-btn add-btn add-btn-fill" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
