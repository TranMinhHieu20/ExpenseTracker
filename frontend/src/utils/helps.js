import moment from 'moment'

export const validateEmail = (email) => {
  const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
  return regex.test(email)
}

export const addThousandSeparator = (number) => {
  if (number === null || number === isNaN) return ''
  const [integerPart, fractionPart] = number.toString().split('.')
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return fractionPart ? `${formattedIntegerPart}.${fractionPart}` : formattedIntegerPart
}

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    label: item?.category,
    amount: item?.amount
  }))
  return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    label: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source
  }))
  return chartData
}
