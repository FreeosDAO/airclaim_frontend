export function getAbsoluteAmount (balance) {
  if (!balance) {
    return 0
  }
  const amount = balance.split(' ')[0]
  return parseFloat(amount)
}

export function getCurrency (balance) {
  if (!balance) {
    return ''
  }
  const currency = balance.split(' ')[1]
  return currency
}

export function formatPrice(value) {
  let val = (value/1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}