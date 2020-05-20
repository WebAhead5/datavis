const tape = require('tape')
const supertest = require("supertest")

const dbBuild = require("../src/database/db_build");
const dbConnection = require("../src/database/db_connection");


tape.test("check if tape works for db tests", t => {

    t.true(true, "tape is working")
    t.end();
})
