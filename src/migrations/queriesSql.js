const regUser = 'INSERT INTO users_reg (username, email, password  ) VALUES (?, ?, ?)';

const delUser = 'DELETE FROM users_reg WHERE id = ?'

const getSingleUser = 'SELECT * FROM users_reg WHERE id = ?'

const listUsers = 'SELECT * FROM users_reg'

const createUsersProfile = 'INSERT INTO users_profile (userId, firstName, lastName, address, creditCard, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)'

const delUserProfile = 'DELETE FROM users_profile WHERE userId = ?'

const listUsersProfiles = 'SELECT * FROM users_profile'

const getSingleUserProfile = 'SELECT * FROM users_profile WHERE userId = ?'

const createReservation = 'INSERT INTO reservation (user_profile_id, dateAndTime, numberOfGuests) VALUES (?, ?, ?)'

const delRes = 'DELETE FROM reservation WHERE reservation_id = ?'

const getRes = 'SELECT * FROM reservation WHERE reservation_id = ?'

const listRes = 'SELECT * FROM reservation'

const getProducts = 'SELECT * FROM products WHERE product_id = ?'

const listProducts = 'SELECT * FROM products'

const createAnOrder = 'INSERT INTO orders (date_order, address, holder) VALUES (?, ?, ?)'

const getOrders = 'SELECT * FROM orders WHERE order_id = ?'

const listOrders = 'SELECT * FROM orders'

const createADelivery = 'INSERT INTO delivery (profile_id, order_id, product_id) VALUES (?, ?, ?)'

const getDelivery = 'SELECT * FROM delivery WHERE delivery_id = ?'

const listDeliveries = 'SELECT * FROM delivery'


export default {
  regUser,
  delUser,
  listUsers,
  getSingleUser,
  createUsersProfile,
  delUserProfile,
  listUsersProfiles,
  getSingleUserProfile,
  createReservation,
  delRes,
  getRes,
  listRes,
  getProducts,
  listProducts,
  createAnOrder,
  getOrders,
  listOrders,
  createADelivery,
  getDelivery,
  listDeliveries
}
