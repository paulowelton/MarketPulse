import requests, os
from requests.exceptions import RequestException
from typing import Union

BASE_URL = 'https://newsapi.org/v2'

def get(endpoint: str, params: Union[dict,None] = None):
    try:
        response = requests.get(
            f'{BASE_URL}{endpoint}',
            headers={'Authorization': f'{os.getenv("NEWS_API_KEY")}'},
            params=params,
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except RequestException as e:
        print(f'[NEWS API ERROR] {endpoint} → {e}')
        return None
