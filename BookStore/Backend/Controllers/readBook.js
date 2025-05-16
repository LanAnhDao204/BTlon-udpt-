import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD || 'thang044')
);

const readBook = async (req, res) => {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ });
    try {
        const { id } = req.params;

        const result = await session.run(
            'MATCH (b:Book {id: $id}) RETURN b',
            { id }
        );

        if (result.records.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const book = result.records[0].get('b').properties;

        res.status(200).json({
            id: book.id,
            name: book.name,
            lang: book.lang,
            category: book.category,
            image: book.image,
            title: book.title,
            description: book.description,
            content: book.content
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await session.close();
    }
};

export default readBook;
