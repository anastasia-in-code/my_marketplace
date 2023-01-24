/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('shops', (table) => {
      table.increments('id').primary();
      table.string('uuid').notNullable();
      table.string('name', 20).notNullable();
      table.integer('phone_number_id', 4).notNullable();
      table.timestamp('expirationDate');
    });
  await knex.schema
    .createTable('users_shops', (table) => {
      table.integer('user_id', 4).notNullable();
      table.integer('shop_id', 4).notNullable();
      table.enu('user_role', ['admin', 'editor'], { useNative: true, enumName: 'editor/admin' });
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTable('shops')
    .dropTable('users_shops');
};
