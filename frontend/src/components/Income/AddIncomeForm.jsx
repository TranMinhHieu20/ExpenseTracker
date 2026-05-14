import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

import moment from 'moment'

const AddIncomeForm = ({ onAddIncome, editData }) => {
  const [income, setIncome] = useState({
    source: editData?.source || '',
    amount: editData?.amount || '',
    date: editData?.date ? moment(editData.date).format('YYYY-MM-DD') : '',
    icon: editData?.icon || ''
  })

  const handleChange = (key, value) => setIncome({ ...income, [key]: value })
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectIcon) => {
          handleChange('icon', selectIcon)
        }}
      />
      <Input
        value={income.source}
        onChange={({ target }) => {
          handleChange('source', target.value)
        }}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => {
          handleChange('amount', target.value)
        }}
        label="Amount"
        placeholder="0"
        type="number"
      />
      <Input
        value={income.date}
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
            onAddIncome(income)
          }}
        >
          {editData ? 'Update Income' : 'Add Income'}
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
