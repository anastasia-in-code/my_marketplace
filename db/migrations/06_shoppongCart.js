/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
   await knex.schema
      .createTable('carts', (table) => {
         table.text('id').primary();
         table.increments('session_id');
         table.integer('user_id');
      });

   await knex.schema
      .createTable('cart_products', (table) => {
         table.text('id').primary();
         table.string('name', 20).notNullable();
         table.integer('price').notNullable();
         table.text('description');
         table.text('shop_id').notNullable();
         table.foreign('shop_id').references('shops.id').onDelete('CASCADE').onUpdate('CASCADE');
         table.text('cart_id').notNullable();
         table.foreign('cart_id').references('carts.id').onDelete('CASCADE').onUpdate('CASCADE');
         table.boolean('changed').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
   await knex
      .table('cart_products', (table) => {
         table.dropForeign('shop_id');
         table.dropForeign('cart_id');
      });
   await knex.schema
      .dropTable('carts');
};
