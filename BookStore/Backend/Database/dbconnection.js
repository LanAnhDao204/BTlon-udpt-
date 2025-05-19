// Database/dbconnection.js
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', '12345678') // thay bằng mật khẩu thật của bạn
);

// Kiểm tra kết nối khi khởi động server
driver.verifyConnectivity()
  .then(() => console.log("✅ Connected to Neo4j successfully"))
  .catch((err) => console.error("❌ Failed to connect to Neo4j:", err));

export default driver;
