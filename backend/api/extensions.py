import os
from flask_caching import Cache
from supabase import create_client, Client
import dotenv

dotenv.load_dotenv()
 
cache = Cache()

supabase: Client = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_KEY"]
)