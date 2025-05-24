const express = require('express');
const router = express.Router();
const driver = require('../config/neo4j');

router.get('/search', async (req, res) => {
    const session = driver.session();
    const query = req.query.query;

    try {
        let cypherQuery;
        let params = { query: query };

        if (query.startsWith('category:')) {
            const categoryName = query.replace('category:', '').trim();
            cypherQuery = `
                MATCH (b:Book)-[:BELONGS_TO]->(c:Category)
                WHERE toLower(c.name) CONTAINS toLower($query)
                RETURN b, c
            `;
            params.query = categoryName;
        } else if (query.startsWith('author:')) {
            const authorName = query.replace('author:', '').trim();
            cypherQuery = `
                MATCH (b:Book)-[:WRITTEN_BY]->(a:Author)
                WHERE toLower(a.name) CONTAINS toLower($query)
                RETURN b, a
            `;
            params.query = authorName;
        } else {
            cypherQuery = `
                MATCH (b:Book)
                WHERE toLower(b.title) CONTAINS toLower($query)
                RETURN b
            `;
        }

        const result = await session.run(cypherQuery, params);
        const books = result.records.map(record => {
            const bookNode = record.get('b').properties;
            const category = record.has('c') ? record.get('c').properties : null;
            const author = record.has('a') ? record.get('a').properties : null;

            return {
                id: bookNode.id,
                title: bookNode.title,
                description: bookNode.description,
                price: bookNode.price,
                category: category ? category.name : undefined,
                author: author ? author.name : undefined
            };
        });

        res.json(books);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        res.status(500).send('Có lỗi xảy ra khi tìm kiếm');
    } finally {
        await session.close();
    }
});

module.exports = router;
