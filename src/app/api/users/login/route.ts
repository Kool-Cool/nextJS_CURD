import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("This is from signUp routes !!!");
    console.log(reqBody);

    const { email, password } = reqBody;

    // Check if the user already exists in the database
    // ?? use await for all Database calls
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists! Please SignUp." },
        { status: 400 }
      );
    }

    // check for password

    const validatePass = await bcryptjs.compare(password, user.password);

    if (!validatePass) {
      return NextResponse.json(
        { error: "Wrong Password or Email address! Please try again." },
        { status: 400 }
      );
    }

    //  Create token ( store in localStorage or cookies)
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
