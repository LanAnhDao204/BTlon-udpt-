import driver from '../Database/dbconnection.js';
import bcrypt from 'bcryptjs';

const userlogin = async (req, res) => {
    const session = driver.session();
    try {
        const { email, password } = req.body;

        // Thêm log chi tiết
        console.log("Login attempt details:");
        console.log("Email:", email);
        console.log("Password length:", password ? password.length : 0);

        const userResult = await session.run(
            'MATCH (u:User {email: $email}) RETURN u',
            { email }
        );

        if (userResult.records.length === 0) {
            console.log("User not found:", email);
            return res.status(400).json({ message: 'User does not exist' });
        }

        const userNode = userResult.records[0].get('u').properties;
        console.log("Found user details:");
        console.log("Name:", userNode.name);
        console.log("Role:", userNode.role);
        console.log("Password hash:", userNode.password ? userNode.password.substring(0, 10) + "..." : "undefined");
        
        try {
            // Kiểm tra password
            const isMatch = await bcrypt.compare(password, userNode.password);
            console.log("Password match result:", isMatch);

            if (!isMatch) {
                console.log("Password mismatch for:", email);
                return res.status(400).json({ message: 'Password is incorrect' });
            }
        } catch (bcryptError) {
            console.error("bcrypt error:", bcryptError);
            return res.status(500).json({ message: 'Error verifying password' });
        }

        console.log("Login successful for:", email);
        
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
        console.error("Login error:", error);
        res.status(500).json({ message: error.message });
    } finally {
        await session.close();
    }
};

export default userlogin;
