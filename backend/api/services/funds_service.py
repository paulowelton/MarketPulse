from api.clients.brapi_client import get

def get_all_funds():
    data = get('/quote/list')
    assets = data.get('stocks', [])
    
    funds = [asset for asset in assets if asset.get('type') == 'fund']
    
    return funds if funds else []

def get_fund_detail(ticker: str):
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