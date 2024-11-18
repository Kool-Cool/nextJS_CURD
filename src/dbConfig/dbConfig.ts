import mongoose from "mongoose";

export async function connect() {
    // Ensure the environment variable is defined
    if (!process.env.CONNECTION_STRING) {
        console.error("CONNECTION_STRING is not defined in the environment variables.");
        process.exit(1);  // Exit the application if no URI is provided
    }

    try {
        // Set mongoose to handle strictQuery warnings (for newer Mongoose versions)
        mongoose.set("strictQuery", true);

        // Attempt to connect to MongoDB using the CONNECTION_STRING from environment variables
        await mongoose.connect(process.env.CONNECTION_STRING);

        // Access the connection object
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
            console.log("Connected to host:", connection.host);  // Logging host
            console.log("Connected to database:", connection.name);  // Logging database name
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);  // Exit process if there is a connection error
        });

    } catch (error) {
        console.error("Error while connecting to MongoDB:", error);
        process.exit(1);  // Exit process if connection fails
    }
}
