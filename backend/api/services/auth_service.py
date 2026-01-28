import bcrypt
from api.extensions import supabase

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
