// dbconnection.js

const neo4j = require('neo4j-driver');
require('dotenv').config();

// Tạo kết nối đến Neo4j Aura (sử dụng SSL mặc định)
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

module.exports = driver;
