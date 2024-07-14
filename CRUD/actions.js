const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { prepareNames } = require("../helpers/tbRowNames");

function readAction(table, params, valls) {
  const stmt = db.prepare(`SELECT *  FROM  ${table} WHERE ${params} `);
  
  const ret = stmt.all(...valls);
  return ret;
}

function createAction(table, data) {
  const colls = prepareNames(table);
  const ret = db
    .prepare(
      `
    INSERT INTO ${table} (
        ${colls.coll}
    )
    VALUES (
       ${colls.insert}
    )
  `
    )
    .run(data);

  return ret;
}

function deleteAction(table, coll, valls) {
  const stmt = db.prepare(`DELETE  FROM  ${table} WHERE ${coll} `);
  const ret = stmt.run(... valls);
  return ret;
}

function updateAction(table, coll, surch, valls) {
  const stmt = db.prepare(`UPDATE  ${table}  SET ${coll} WHERE ${surch} `);
  const ret = stmt.run(... valls);
  return ret;
}
exports.deleteAction = deleteAction;
exports.createAction = createAction;
exports.updateAction = updateAction;
exports.readAction = readAction;
