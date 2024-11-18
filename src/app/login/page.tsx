"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true); // Initially disabled
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility toggle
  const [responseMessage, setResponseMessage] = useState(""); // Message to show user
  const [redirecting, setRedirecting] = useState(false); // To manage the redirecting state

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");

      // Show the redirecting message
      setResponseMessage("Login successful! Redirecting to your profile...");

      // After 3 seconds, redirect to the profile page
      setRedirecting(true);
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error: any) {
      console.log("Login failed", error.message);
      setResponseMessage(`Login failed: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false); // Enable button when both fields are filled
    } else {
      setButtonDisabled(true); // Disable button if any field is empty
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      {/* Email Field */}
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      {/* Password Field */}
      <label htmlFor="password">Password</label>
      <div className="relative mb-4">
        <input
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type={passwordVisible ? "text" : "password"} // Toggle the password visibility
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
          onClick={() => setPasswordVisible((prev) => !prev)} // Toggle password visibility
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>

      {/* Login Button */}
      <button
        onClick={onLogin}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
          buttonDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={buttonDisabled} // Disables button if buttonDisabled is true
      >
        {loading ? "Logging in..." : buttonDisabled ? "Please fill all fields" : "Login"}
      </button>

      {/* Redirecting Message */}
      {responseMessage && (
        <p className="text-center text-lg mt-4 text-green-500">
          {responseMessage}
        </p>
      )}

      {/* Redirect to Signup Page */}
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
