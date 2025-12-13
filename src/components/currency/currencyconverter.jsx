import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ baseCurrency = 'USD', targetCurrency, rate }) => {
  const [amount, setAmount] = useState(1);
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
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (!rate) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-2">Currency Converter</h3>
        <p className="text-gray-500 text-sm">Exchange rate unavailable</p>
      </div>
    );
  }

  const fromCurrency = isConvertingFromBase ? baseCurrency : targetCurrency;
  const toCurrency = isConvertingFromBase ? targetCurrency : baseCurrency;
  const displayRate = isConvertingFromBase ? rate : 1 / rate;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Currency Converter</h3>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          Live
        </span>
      </div>


      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Exchange Rate</div>
        <div className="text-sm font-semibold text-blue-700">
          1 {fromCurrency} = {displayRate.toFixed(4)} {toCurrency}
        </div>
      </div>


      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-600">Amount</label>
            <span className="text-xs font-medium">{fromCurrency}</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwapCurrencies}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
            title="Swap currencies"
          >
            ⇅
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-600">Converted</label>
            <span className="text-xs font-medium">{toCurrency}</span>
          </div>
          <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
            <div className="font-semibold">
              {formatCurrency(convertedAmount)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-600 mb-2">Quick convert:</p>
        <div className="flex flex-wrap gap-1">
          {[10, 50, 100, 500].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              {quickAmount}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>{baseCurrency} → {targetCurrency}</span>
          <span className="font-medium">{rate.toFixed(4)}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>{targetCurrency} → {baseCurrency}</span>
          <span className="font-medium">{(1 / rate).toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;