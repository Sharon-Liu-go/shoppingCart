const moment = require("moment")

module.exports = {
  ifCond: function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },

  date: function (a) {
    return moment(a).format().slice(0, 10);
  },

  time: function (a) {
    let a_s = a.getTime()
    a.setTime(a_s + 1000 * 60 * 60 * 24);//設定新時間比舊時間多一天
    return moment(a).format("h:mm A , MMMM Do YYYY ")
  },

  getShippingStatus(shipping_status_no) {
    switch (shipping_status_no) {
      case '-1': return 'Canceled'
      case '0': return 'Processing'
      case '1': return 'Dispatched'
      case '2': return 'Delivered'
    }
  },

  getPayStatus(payment_status_no) {
    switch (payment_status_no) {
      case '-1': return 'Canceled'
      case '0': return 'Unpaid'
      case '1': return 'Paid'
      case '2': return 'Pending Refund'
      case '3': return 'Refunded'
    }
  },

  countLimit(a) {
    if (a >= 20) {
      return `20+`
    } return a
  }
}
