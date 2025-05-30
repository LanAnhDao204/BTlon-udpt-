// dbconnection.js

import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" }); 

import neo4j from 'neo4j-driver';

// Đảm bảo tên biến nhất quán: NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD
const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
const user = process.env.NEO4J_USERNAME || process.env.NEO4J_USER || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'thang044';

console.log("Neo4j Connection Details:");
console.log("NEO4J_URI:", uri);
console.log("NEO4J_USER:", user);

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Kiểm tra kết nối ngay khi tạo driver
driver.verifyConnectivity()
  .then(() => console.log("✅ Connected to Neo4j successfully!"))
  .catch(err => console.error("❌ Neo4j connection error:", err.message));

export default driver;
