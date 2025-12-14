import React, { useState, useEffect } from 'react';


const getCurrencySymbol = (code) => {
    switch (code) {
        case 'USD': return '$';
        case 'JPY': return '¥';
        case 'EUR': return '€';
        case 'GBP': return '£';
        default: return code.charAt(0);
    }
};

const CurrencyConverter = ({ baseCurrency = 'USD', targetCurrency, rate }) => {
  const [amount, setAmount] = useState(100); 
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isConvertingFromBase, setIsConvertingFromBase] = useState(true);

  useEffect(() => {
    if (!rate) return;
    setConvertedAmount(isConvertingFromBase ? amount * rate : amount / rate);
  }, [amount, rate, isConvertingFromBase]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handleSwapCurrencies = () => {

    setIsConvertingFromBase(!isConvertingFromBase);
    

    const newConvertedAmount = isConvertingFromBase ? amount * rate : amount / rate;
    setAmount(newConvertedAmount); 
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (!rate) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Currency Exchange</h3>
        <p className="text-gray-500 text-sm">Exchange rate unavailable</p>
      </div>
    );
  }

  const fromCurrency = isConvertingFromBase ? baseCurrency : targetCurrency;
  const toCurrency = isConvertingFromBase ? targetCurrency : baseCurrency;
  const displayRate = isConvertingFromBase ? rate : 1 / rate;

  const renderCurrencyBox = (isFrom, currencyCode, value) => {
    const symbol = getCurrencySymbol(currencyCode);
    const boxColor = isFrom 
      ? "bg-gray-50 border border-gray-100"
      : "bg-red-50/50 border border-red-100"; 
    const symbolColor = isFrom ? "bg-gray-200 text-gray-700" : "bg-red-200 text-red-700";

    return (
      <div className={`p-4 rounded-xl shadow-inner ${boxColor}`}>
        <div className="flex justify-between items-start">
          <div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${symbolColor}`}
          >
            {symbol}
          </div>
          
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              {isFrom ? 'From' : 'To'}
            </p>
            {isFrom ? (
              <div className="flex items-center relative">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  // Styling to make the input look like the display value
                  className="bg-transparent text-2xl font-black w-full text-right focus:outline-none"
                  placeholder="0"
                  min="0"
                  step="1"
                />

                <span className="absolute right-0 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </span>
              </div>
            ) : (

              <p className="text-3xl font-black text-gray-900">
                {formatCurrency(value)}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">{currencyCode}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 font-sans border border-gray-100 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Currency Exchange</h3>
          <span className="text-xs flex items-center text-blue-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0 7 7 0 01-14 0z" clipRule="evenodd" />
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Live Rate
          </span>
        </div>


        <div className="space-y-3">
          {renderCurrencyBox(true, fromCurrency, amount)}

          <div className="flex justify-center -my-3 z-10 relative">
            <button
              onClick={handleSwapCurrencies}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 flex items-center justify-center text-lg text-gray-600 transition-all transform hover:rotate-180"
              title="Swap currencies"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 10v-5m0 0l4 4m-4-4l-4 4" />
              </svg>
            </button>
          </div>

          {renderCurrencyBox(false, toCurrency, convertedAmount)}
        </div>
        <div className="mt-4 text-center text-sm text-gray-700 font-medium">
            1 {baseCurrency} = {rate.toFixed(1)} {targetCurrency}
        </div>
      </div>

      <div className="mt-6 flex justify-center text-sm text-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.356-2m15.356 2H15" />
        </svg>
        Refresh
      </div>
    </div>
  );
};

export default CurrencyConverter;