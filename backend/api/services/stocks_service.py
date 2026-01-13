import requests, os, dotenv

dotenv.load_dotenv()

HEADERS = {
    'Authorization': f'Bearer {os.getenv("BRAPI_API_KEY")}'
}

BASE_URL = 'https://brapi.dev/api'

def list_stocks():
    res = requests.get(f'{BASE_URL}/quote/list', headers=HEADERS)
    return res.json().get('stocks', [])

def list_segments():
    res = requests.get(f'{BASE_URL}/quote/list', headers=HEADERS)
    return res.json().get('availableSectors', [])

def stock_details(ticker: str):
    res = requests.get(f'{BASE_URL}/quote/{ticker}', headers=HEADERS)
    return res.json().get('results', [])
