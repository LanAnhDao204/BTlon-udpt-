import driver from '../Database/dbconnection.js';

const searchBook = async (req, res) => {
    const session = driver.session();
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json([]);
        }

        console.log(`Đang tìm kiếm với từ khóa: "${query}"`);
        
        // Tìm kiếm trong nhiều trường của sách với Neo4j
        const result = await session.run(
            `MATCH (b:Book)
             WHERE toLower(b.name) CONTAINS toLower($query) 
             OR toLower(b.title) CONTAINS toLower($query)
             OR toLower(b.category) CONTAINS toLower($query)
             RETURN b`,
            { query }
        );

        const books = result.records.map(record => record.get('b').properties);
        console.log(`Tìm thấy ${books.length} kết quả`);
        
        res.status(200).json(books);
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        res.status(500).json([]);
    } finally {
        await session.close();
    }
};

export default searchBook;
