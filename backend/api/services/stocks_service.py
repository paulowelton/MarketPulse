from api.clients.brapi_client import get

def list_stocks():
    data = get('/quote/list/')
    assets = data.get('stocks', [])

    stocks = [asset for asset in assets if asset.get('type') == 'stock' and str(asset.get('stock'))[-1] != 'F']
    
    return stocks if stocks else []

def list_segments():
    data = get('/quote/list/')
    return data.get('availableSectors', []) if data else []

def stock_details(ticker: str):
    modules = [
    "summaryProfile",
    # "balanceSheetHistory",
    # "balanceSheetHistoryQuarterly",
    # "defaultKeyStatistics",
    # "defaultKeyStatisticsHistory",
    # "defaultKeyStatisticsHistoryQuarterly",
    # "incomeStatementHistory",
    # "incomeStatementHistoryQuarterly",
    # "financialData",
    # "financialDataHistory",
    # "financialDataHistoryQuarterly",
    # "valueAddedHistory",
    # "valueAddedHistoryQuarterly",
    # "cashflowHistory",
    # "cashflowHistoryQuarterly"
    ]
    modules_param = ",".join(modules)
    
    data = get(f'/quote/{ticker}?modules={modules_param}')
    return data.get('results', []) if data else []

if __name__ == '__main__':
    list_stocks()