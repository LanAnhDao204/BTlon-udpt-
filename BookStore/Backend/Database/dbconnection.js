// dbconnection.js

import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" }); // Đúng đường dẫn, chữ thường

import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

console.log("NEO4J_URI:", uri);
console.log("NEO4J_USERNAME:", user);

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

driver.verifyConnectivity()
  .then(() => console.log("✅ Connected to Neo4j successfully!"))
  .catch(err => console.error("❌ Neo4j connection error:", err.message));

export default driver;
