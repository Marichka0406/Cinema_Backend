const crypto = require('crypto');
const { User, UserRole } = require('../models/associations');

const authController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ 
      where: { email },
      include: UserRole // Include the UserRole model to get the user's role
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert password from request to hashed string
    const hashedPasswordFromRequest = crypto.createHash('sha256').update(password).digest('hex');

    // Check if passwords match
    if (hashedPasswordFromRequest !== user.password.toString('hex')) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Get user role
    const role = user.UserRole.role;

    // Respond with user data
    res.status(200).json({ 
      id: user.id,
      username: user.username,
      email: user.email,
      role: role,
      status: 200
      // Add any other user properties you want to include in the response
    });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ message: 'Error while logging in' });
  }
};

module.exports = { authController };
