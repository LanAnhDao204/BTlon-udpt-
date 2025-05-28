import driver from '../Database/dbconnection.js';

const userlogin = async (req, res) => {
    const session = driver.session();
    try {
        const { email, password } = req.body;

        const userResult = await session.run(
            'MATCH (u:User {email: $email}) RETURN u',
            { email }
        );

        if (userResult.records.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const userNode = userResult.records[0].get('u').properties;
        const bcrypt = await import('bcryptjs');
        const isMatch = await bcrypt.default.compare(password, userNode.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        res.status(200).json({
            message: 'Login Successful',
            user: {
                id: userNode.id, 
                name: userNode.name,
                email: userNode.email,
                image: userNode.image,
                gender: userNode.gender,
                address: userNode.address,
                dob: userNode.dob,
                phone: userNode.phone,
                role: userNode.role,
                books: userNode.books
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await session.close();
    }
};

export default userlogin;
