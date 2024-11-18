import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



export async function POST(request: NextRequest) {
    await connect();
    // console.log(connect());
    try {
        // Parse the incoming request body
        const reqBody = await request.json();
        console.log("This is from signUp routes !!!");
        console.log(reqBody);

        const { username, email, password } = reqBody;

        // Check if the user already exists in the database
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists! Please login." },
                { status: 400 }  // Use HTTP 400 for bad request when user exists
            );
        }

        // Hash the password with bcryptjs
        const salt = await bcryptjs.genSalt(10);  
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Respond with success and the saved user data
        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser
            },
            { status: 201 }  // Status code 201 for successful resource creation
        );

    } catch (error: any) {
        // Catch errors and return an appropriate error message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }  // Internal server error
        );
    }
}
