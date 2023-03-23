/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('shops', (table) => {
      table.text('id').primary();
      table.string('name', 20).notNullable();
      table.integer('phone_number_id', 4).notNullable();
      table.timestamp('expirationDate');
    });
  await knex.schema
    .createTable('users_shops', (table) => {
      table.integer('user_id', 4).notNullable();
      table.text('shop_id').notNullable();
      table.enu('user_role', ['admin', 'editor'], { useNative: true, existingType: true, enumName: 'user_role_enum' });
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
