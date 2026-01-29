import bcrypt
# from api.extensions import supabase
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

def register_user(body):
    hashed_password = bcrypt.hashpw(
        body["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    params = {
        "name": body["name"],
        "email": body["email"],
        "password": hashed_password
    }

    response = (
        supabase
        .table("users")
        .insert(params)
        .execute()
    )

    return {"status": "success"}

def get_user_by_email(email):
    response = (
        supabase
        .table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )
    
    user = response.data[0] if response.data else None
    
    return user

def get_user_by_id(user_id):
    response = (
        supabase
        .table("users")
        .select("*")
        .eq("id", int(user_id))
        .maybe_single() 
        .execute()
    )
    return response.data

if __name__ == '__main__':
    user = get_user_by_id(10)
    print(user)
