// dbconnection.js

import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" }); // Đúng đường dẫn, chữ thường

import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

console.log("NEO4J_URI:", uri); // Thêm dòng này để debug

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
export default driver;
