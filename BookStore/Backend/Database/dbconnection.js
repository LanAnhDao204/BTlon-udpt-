// Database/dbconnection.js
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config({ path: "./Config/config.env" });

const attemptConnections = async () => {
  const connections = [
    // ✅ Kết nối Neo4j Aura Cloud (ưu tiên)
    {
      uri: process.env.NEO4J_URI,
      user: process.env.NEO4J_USERNAME,  // ✅ Đúng tên biến
      password: process.env.NEO4J_PASSWORD,
      description: "Using config.env"
    },
    // ⚠️ Kết nối Local 7690
    {
      uri: "bolt://localhost:7690",
      user: "neo4j",
      password: "thang044",
      description: "Default port 7690"
    },
    // ⚠️ Kết nối Local 7687
    {
      uri: "bolt://localhost:7687",
      user: "neo4j",
      password: "thang044", 
      description: "Default Neo4j port 7687"
    }
  ];

  let driver = null;
  let successConfig = null;

  console.log("Attempting to connect to Neo4j...");
  
  for (const config of connections) {
    try {
      console.log(`Trying connection: ${config.description}`);
      console.log(`URI: ${config.uri}, User: ${config.user}`);
      
      const tempDriver = neo4j.driver(
        config.uri,
        neo4j.auth.basic(config.user, config.password)
      );
      
      await tempDriver.verifyConnectivity();

      driver = tempDriver;
      successConfig = config;
      console.log(`✅ Successfully connected to Neo4j using: ${config.description}`);
      break;
    } catch (error) {
      console.log(`❌ Connection failed: ${config.description}`);
      console.log(`   Error: ${error.message}`);
    }
  }

  if (!driver) {
    console.error("❌ Failed to connect to Neo4j with all configurations!");
    console.error("Please ensure Neo4j is running and accessible.");
    return {
      session: () => {
        throw new Error("Neo4j connection failed. Please check your database connection.");
      },
      close: () => {}
    };
  }

  console.log(`Neo4j connected at: ${successConfig.uri}`);
  return driver;
};

// ✅ Khởi tạo driver
const driver = await attemptConnections();

export default driver;
