import React from 'react'
import Input from '../Inputs/Input'
import EmojiPicker from 'emoji-picker-react'
import EmojiPickerPopup from '../EmojiPickerPopup'
import moment from 'moment'
const AddExpenseForm = ({ onAddExpense, editData }) => {
  const [expense, setExpense] = React.useState({
    category: editData?.category || '',
    icon: editData?.icon || '',
    date: editData?.date ? moment(editData.date).format('YYYY-MM-DD') : '',
    amount: editData?.amount || ''
  })

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value })
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectIcon) => {
          handleChange('icon', selectIcon)
        }}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => {
          handleChange('category', target.value)
        }}
        label="Expense Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => {
          handleChange('amount', target.value)
        }}
        label="Amount"
        placeholder="0"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => {
          handleChange('date', target.value)
        }}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => {
            onAddExpense(expense)
          }}
        >
          {editData ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
