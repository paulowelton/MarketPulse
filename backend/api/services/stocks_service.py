# from api.clients.brapi_client import get
# from ..clients.brapi_client import get
import requests, os
from requests.exceptions import RequestException
from typing import Union

BASE_URL = 'https://brapi.dev/api'

def get(endpoint: str, params: Union[dict,None] = None):
    try:
        response = requests.get(
            f'{BASE_URL}{endpoint}',
            headers={'Authorization': f'Bearer {os.getenv("BRAPI_API_KEY")}'},
            params=params,
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except RequestException as e:
        print(f'[BRAPI ERROR] {endpoint} → {e}')
        return None


def list_stocks():
    data = get('/quote/list/')
    assets = data.get('stocks', [])

    stocks = [asset for asset in assets if asset.get('type') == 'stock' and str(asset.get('stock'))[-1] != 'F']
    
    return stocks if stocks else []

def list_segments():
    data = get('/quote/list/')
    return data.get('availableSectors', []) if data else []

def stock_details(ticker: str):
    data = get(f'/quote/{ticker}')
    return data.get('results', []) if data else []

if __name__ == '__main__':
    list_stocks()