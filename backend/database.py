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
farms_collection = db["farms"]
harvest_history_collection = db["harvest_history"]
soil_tests_collection = db["soil_tests"]
weather_logs_collection = db["weather_logs"]
prescriptions_collection = db["prescriptions"]


# Test MongoDB connection
def test_database_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully!")
    except Exception as e:
        print("MongoDB connection failed:", e)
        