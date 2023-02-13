/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('products', (table) => {
      table.string('id', 50).primary();
      table.string('name', 20).notNullable();
      table.decimal('price', null).notNullable();
      table.string('description', 120);
      table.string('shop_id', 50).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTable('products');
};
