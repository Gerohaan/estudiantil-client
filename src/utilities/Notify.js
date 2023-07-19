import { Notify } from 'quasar'

const sendNotify = function (type, message, color) {
  let icon = type === 'positive' ? 'check_circle_outline' : 'warning'
  let colorValidate = color
  if (type !== 'negative') {
    colorValidate = 'positive'
  } else {
    colorValidate = 'negative'
  }
  Notify.create({
    message: message,
    type: type,
    color: colorValidate,
    position: 'bottom-right',
    icon: icon,
    rounded: true,
  })
}

export default sendNotify
