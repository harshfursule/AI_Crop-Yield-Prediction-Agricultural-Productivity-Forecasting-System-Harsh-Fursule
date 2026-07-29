import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB configuration
MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Create MongoDB client
client = MongoClient(MONGO_URL)

# Select database
db = client[DATABASE_NAME]

# Select collections
users_collection = db["users"]
predictions_collection = db["predictions"]


# Test MongoDB connection
def test_database_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully!")
    except Exception as e:
        print("MongoDB connection failed:", e)
        