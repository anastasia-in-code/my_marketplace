/* eslint-disable indent */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
   await knex.schema
   .table('products', (table) => {
      table.string('file_id', 8);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
   await knex.schema
   .table('products', (table) => {
      table.dropColumns('file_id');
   });
};
