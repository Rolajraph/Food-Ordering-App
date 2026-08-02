export const ORDER_STATUS = Object.freeze({
  PENDING: 'pending',
  PREPARING: 'preparing',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
});

// State machine: defines which status transitions are legal
export const ALLOWED_TRANSITIONS = Object.freeze({
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.ON_THE_WAY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.ON_THE_WAY]: [ORDER_STATUS.DELIVERED],
  [ORDER_STATUS.DELIVERED]: [], // terminal state
  [ORDER_STATUS.CANCELLED]: [], // terminal state
});

export const PAYMENT_METHODS = Object.freeze({
  COD: 'cash_on_delivery',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
});