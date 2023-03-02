const {
  ADD_ADMIN, GET_SHOP, EDIT_SHOP, ADD_PRODUCT, DELETE_PRODUCT
} = require('./constants');

const ADMIN_PERMISSIONS = [GET_SHOP, ADD_ADMIN, EDIT_SHOP, ADD_PRODUCT, DELETE_PRODUCT];
const EDITOR_PERMISSIONS = [GET_SHOP, ADD_PRODUCT];

module.exports = { ADMIN_PERMISSIONS, EDITOR_PERMISSIONS };