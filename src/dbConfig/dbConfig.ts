import mongoose from "mongoose";

export async function connect() {
    try {
        // Await the mongoose connection to ensure it completes before proceeding
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        // Event listener for successful connection
        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        // Event listener for connection error
        connection.on('error', (err) => {
            console.log('MongoDB connection error');
            console.log(err);
            process.exit(1);  // Ensure process exits with an error code
        });
    } catch (error) {
        console.log('Something went wrong while connecting to MongoDB!');
        console.log(error);
        process.exit(1);  // Exit process if connection fails
    }
}
