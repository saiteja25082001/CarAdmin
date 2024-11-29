import { MongoClient } from 'mongodb';

// MongoDB URI
const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Reuse the MongoDB connection
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// POST method to handle user signup
export async function POST(req) {
  try {
    const { username, email, password } = await req.json(); // Parse JSON from the request body

    // Validate that all required fields are present
    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'All fields (username, email, password) are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test'); // Replace with your actual database name

    // Insert the new user document
    const usersCollection = db.collection('users');
    const newUser = { username, email, password };
    await usersCollection.insertOne(newUser);

    return new Response(JSON.stringify({ message: 'User added successfully', user: newUser }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add user', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// GET method to retrieve all users
export async function GET(req) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test'); // Replace with your actual database name

    // Fetch all user documents
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve users', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
