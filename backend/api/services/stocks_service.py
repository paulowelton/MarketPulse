from api.clients.brapi_client import get

def list_stocks():
    data = get('/quote/list/')
    return data.get('stocks', []) if data else []

def list_segments():
    data = get('/quote/list/')
    return data.get('availableSectors', []) if data else []

def stock_details(ticker: str):
    data = get(f'/quote/{ticker}')
    return data.get('results', []) if data else []