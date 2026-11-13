import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function registerUser(req,res) {
    try{
        const { name, email, password, phone, location, role} = req.body;

        //1. Check required fields
        if(!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Name, email , password and role are required ."
            });
        }

        // 2. Validate the input 
    const normalizedEmail = email.trim().toLowerCase();

     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long.",
        });
    }

    if (!["farmer", "buyer", "driver"].includes(role)) {
        return res.status(400).json({
            message : "Please select a valid account role."
        });
    }

    // 3. Check if whether the email is already registered 
     const existingUser = await User.findOne({
        email: normalizedEmail
     })

     if(existingUser) {
        return res.status(409).json({
            message: "An account with this email already exists."
        });
     }

     // 4. Hash the password
     const hashedPassword = await bcrypt.hash(password, 12);

     // 5. Create the user 
     const newUser = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        location,
        role,
     });

     //6 . Return a safe user profile
     return res.status(201).json({
        message: "Registration successful.",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            location: newUser.location,
            role: newUser.role,
        },
     });
} catch (error) {
    // Handle duplicate email error from MongoDB
    if (error.code === 11000) {
        return res.status(409).json({
            message: "An account with this email already exists.",
        });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
        message: "something went wrong during registration."
    });
 }   
}

export async function loginUser(req,res) {
    try {
        const { email, password } = req.body;

        // 1. Check required fields
        if(!email || !password ) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        if(typeof email !== "string" || !email.trim()) {
             return res.status(400).json({
                message: "Please provide a valid email address."
             });
        }

         // 2 . Normalize the email 
         const normalizedEmail = email.trim().toLowerCase();

         // 3. Find teh user and explicitly include the password hash
        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+password");

        if(!user) {
             return res.status(401).json({
                message: "Invalid email or password.",
             });
        }

        // 4. Compare submitted password with the stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid) {
            return res.status(401).json({
                message : "Invalid email or password.",
            });
        }

        if(!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET  is not configured.")
        }

        // 5 . Generate a JWT  
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // 6. Store the token in a HTTP-only cookie
        res.cookie("token", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === "production",
             sameSite: "lax",
             maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 7. Return the safe user profile
        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                role: user.role,
            },
        });
    } catch (error) {
         console.error("Login error:", error);

         return res.status(500).json({
            message: "Something went wrong during login.",
         });
    }
}