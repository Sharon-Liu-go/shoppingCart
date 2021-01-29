function getShipMethod(shipping_method_no) {
  switch (shipping_method_no) {
    case '1': return 'Home delivery'
  }
}

function getPayMethod(payment_method_no) {
  switch (payment_method_no) {
    case '1': return 'Credit card'
  }
}

module.exports = {
  getShipMethod,
  getPayMethod
}