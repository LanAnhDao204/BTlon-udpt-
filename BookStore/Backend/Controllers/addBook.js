import { v4 as uuidv4 } from 'uuid'
import driver from '../Database/dbconnection.js'

const addBook = async (req, res) => {
    const session = driver.session()
    try {
        const id = uuidv4()
        const { name, lang, category, image, title, link, content, description } = req.body

        const result = await session.run(
            `CREATE (b:Book {
        id: $id, name: $name, lang: $lang, category: $category,
        image: $image, title: $title, link: $link,
        content: $content, description: $description
      }) RETURN b`,
            { id, name, lang, category, image, title, link, content, description }
        )

        const book = result.records[0].get('b').properties
        res.status(200).json({ message: "Book added successfully", data: book })
    } catch (error) {
        res.status(500).json({ message: error.message })
    } finally {
        await session.close()
    }
}

export default addBook
