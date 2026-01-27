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

def login_user(body):
    response = (
        supabase
        .table("users")
        .select("*")
        .eq("email", body["email"])
        .execute()
    )
    
    user = response.data[0] if response.data else None

    if not user:
        return False

    stored_hash = user["password"].encode("utf-8")

    try:
        validate = bcrypt.checkpw(
            body["password"].encode("utf-8"),
            stored_hash
        )
        if validate:
            return {"status": "success"}
        else:
            return {"status": "error"}
    
    except:
        return {"status": "error"}