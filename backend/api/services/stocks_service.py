import requests, os, dotenv

dotenv.load_dotenv()

def list_stocks():
    endpoint = f'https://brapi.dev/api/quote/list/'
    
    response = requests.get(endpoint, params={
        'Authorization': f'Bearer {os.getenv("BRAPI_API_KEY")}'
    })
    
    stocks = response.json()['stocks']
    
    return stocks

if __name__ == '__main__':
    list_stocks()