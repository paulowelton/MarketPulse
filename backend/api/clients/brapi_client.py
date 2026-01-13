import requests, os
from requests.exceptions import RequestException

BASE_URL = 'https://brapi.dev/api'

def get(endpoint: str, params: dict | None = None):
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
