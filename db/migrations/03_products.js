/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('products', (table) => {
      table.text('id').primary();
      table.string('name', 20).notNullable();
      table.integer('price').notNullable();
      table.text('description');
      table.text('shop_id').notNullable();
      table.foreign('shop_id').references('shops.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex
    .table('products', (table) => {
      table.dropForeign('shop_id');
    });
  await knex.schema
    .dropTable('products');
};
