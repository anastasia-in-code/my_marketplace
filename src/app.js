const knex = require('knex');
const { Model } = require('objection');
const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const knexfile = require('../db/knexfile');
const { heartbeatCheck } = require('../db/heartbeatCheck');
const { router } = require('./router');

const app = new Koa();

const db = knex(knexfile.development);
Model.knex(db);
heartbeatCheck(db);

app.use(session(app));
app.use(koaBody());
app.use(router.allowedMethods());

app.use(router.routes());

app.listen(3001, () => {
  console.log('server started');
});
