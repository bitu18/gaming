import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

// Register
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: role == 'seller' ? false : true,
            verificationToken,
        });

        try {
            await sendEmail({
                email,
                subject: 'Email Verification - Real Estate Platform',
                message: `<p>Your verification code is: <strong>${verificationToken}</strong></p>`,
            });
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // We will still create the user
        }

        res.status(201).json({
            message: 'User registered successfully. Please check your email for the verification code.',
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verfity your email or contact support' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: 'Your account has been blocked by admin, Please contact support.' });
        }

        // token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ message: 'Login successfully', token, user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get profile
export const getMe = async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) return res.status(400).json({message: "User"});

    res.json({
      success: true,
      user
    })
  } catch (error) {
     res.status(500).json({
        message: error.message
    });
  }
}

// Verify email
export const verifyEmail = async(req, res) => {
  try {
    const {email, code} = req.body;
    if(!email || !code) return res.status(400).json({message: "Email and code are required."})

      const user = await User.findOne({email});
      if(!user) return res.status(400).json({message: "User not found"});

      if(user.isVerified) return res.status(400).json({message: "Email already verified."});

      if(user.verificationToken !== code) return res.status(400).json({message: "Invalid verification code."});

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      res.status(200).json({
        message: "Email verified successfully",
        success: true
      })
  } catch (error) {
     res.status(500).json({
        message: error.message,
        success: false
    });
  }
}

// Forgot password (for reset the password we require the email)
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with that email address" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const clientUrl = "http://localhost:5173";
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
        const message = `
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Please click on the link below to reset your password:</p>
            <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
            <p>This link will expire in 15 minutes.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset - Real Estate Platform",
                message,
            });
            res.status(200).json({ message: "Password reset email sent", success: true });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: "Could not send email", success: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Reset password (real!!)
export const resetPassword = async(req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()},
    })

    if(!user) return res.status(400).json({message: "Invalid or expired password reset token", success: false});

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({message: "Password updated successfully", success: true})
  } catch (error) {
    res.status(500).json({ message: err.message, success: false });
  }
}
