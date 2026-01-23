from api.clients.news_api_client import get

def list_everthing_news(subject: str):
    data = get(f'/everything?q={subject}')
    
    return data