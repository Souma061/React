import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { InputBox } from './components';
import useCurrencyInfo from './Hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastConverted, setLastConverted] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('currencyFavorites');
    return saved ? JSON.parse(saved) : ['usd', 'eur', 'gbp', 'jpy'];
  });
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // Enhanced swap function with animation feedback
  const swap = useCallback(() => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setError('');
  }, [to, from, amount, convertedAmount]);

  // Enhanced convert function with error handling
  const convert = useCallback(() => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!currencyInfo[to]) {
      setError('Invalid currency selected');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API delay for better UX
    setTimeout(() => {
      const rate = currencyInfo[to];
      const converted = amount * rate;
      setConvertedAmount(converted);
      setExchangeRate(rate);
      setLastConverted(new Date().toLocaleTimeString());
      setIsLoading(false);
    }, 300);
  }, [amount, currencyInfo, to]);

  // Auto-convert when currencies change
  useEffect(() => {
    if (amount > 0 && currencyInfo[to]) {
      convert();
    }
  }, [from, to, convert]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('currencyFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add to favorites
  const addToFavorites = (currency) => {
    if (!favorites.includes(currency) && favorites.length < 12) {
      setFavorites([...favorites, currency]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (currency) => {
    setFavorites(favorites.filter((fav) => fav !== currency));
  };

  // Toggle favorite status
  const toggleFavorite = (currency) => {
    if (favorites.includes(currency)) {
      removeFromFavorites(currency);
    } else {
      addToFavorites(currency);
    }
  };

  // Quick select favorite currencies
  const quickSelectCurrency = (currency, type) => {
    if (type === 'from') {
      setFrom(currency);
    } else {
      setTo(currency);
    }
  };

  // Clear all inputs
  const clearAll = () => {
    setAmount(1);
    setConvertedAmount(0);
    setError('');
    setLastConverted('');
    setExchangeRate(0);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url('https://i.pinimg.com/1200x/e5/fa/6f/e5fa6fc22af5f98fb06e2431a892493f.jpg')`,
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            💱 Currency Converter
          </h1>
          <p className="text-white/80 text-sm">Convert currencies in real-time</p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl">
          {/* Favorites Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-medium">⭐ Favorites</h3>
              <button
                onClick={() => setShowFavoritesModal(true)}
                className="px-3 py-1 bg-purple-500/70 hover:bg-purple-600/70 text-white text-xs rounded-md transition-all"
                title="Manage favorites"
              >
                ⚙️ Manage
              </button>
            </div>

            {favorites.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {favorites.map((currency) => (
                  <div
                    key={currency}
                    className="flex items-center gap-1 bg-white/10 rounded-lg p-1"
                  >
                    <button
                      onClick={() => quickSelectCurrency(currency, 'from')}
                      className="px-2 py-1 bg-blue-500/70 text-white text-xs rounded-md hover:bg-blue-600/70 transition-all"
                      title={`Set as 'From' currency`}
                    >
                      {currency.toUpperCase()}
                    </button>
                    <button
                      onClick={() => quickSelectCurrency(currency, 'to')}
                      className="px-2 py-1 bg-green-500/70 text-white text-xs rounded-md hover:bg-green-600/70 transition-all"
                      title={`Set as 'To' currency`}
                    >
                      →
                    </button>
                    <button
                      onClick={() => removeFromFavorites(currency)}
                      className="px-1 py-1 bg-red-500/70 text-white text-xs rounded-md hover:bg-red-600/70 transition-all"
                      title="Remove from favorites"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-xs">
                No favorites yet. Add currencies to your favorites for quick access!
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setFrom(currency);
                  addToFavorites(currency);
                }}
                selectedCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5 my-4">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 hover:scale-105 transition-all duration-200 shadow-lg"
                onClick={swap}
                title="Swap currencies"
              >
                ⇅ Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                  addToFavorites(currency);
                }}
                selectedCurrency={to}
                onAmountChange={(amount) => setConvertedAmount(amount)}
                amountDisable
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 rounded-lg">
                <p className="text-red-100 text-sm">⚠️ {error}</p>
              </div>
            )}

            {/* Exchange Rate Info */}
            {exchangeRate > 0 && !error && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-lg">
                <div className="text-green-100 text-sm space-y-1">
                  <p>
                    📊 Exchange Rate: 1 {from.toUpperCase()} = {exchangeRate.toFixed(4)}{' '}
                    {to.toUpperCase()}
                  </p>
                  {lastConverted && (
                    <p className="text-xs text-green-200">🕒 Last updated: {lastConverted}</p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Converting...
                  </span>
                ) : (
                  `💰 Convert ${from.toUpperCase()} to ${to.toUpperCase()}`
                )}
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-3 bg-gray-500/70 hover:bg-gray-600/70 text-white rounded-lg transition-all duration-200"
                title="Clear all"
              >
                🗑️
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-white/60 text-xs text-center">
              💡 Tip: Use the "Manage" button to add/remove favorite currencies
            </p>
          </div>
        </div>

        {/* Favorites Management Modal */}
        {showFavoritesModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-bold">⭐ Manage Favorites</h3>
                <button
                  onClick={() => setShowFavoritesModal(false)}
                  className="text-white/70 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <p className="text-white/80 text-sm mb-3">
                  Select currencies to add/remove from favorites (max 12):
                </p>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                  {options.sort().map((currency) => {
                    const isFavorite = favorites.includes(currency);
                    return (
                      <button
                        key={currency}
                        onClick={() => toggleFavorite(currency)}
                        className={`p-2 rounded-lg text-xs font-medium transition-all ${
                          isFavorite
                            ? 'bg-yellow-500/70 text-white border-2 border-yellow-400'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 border-2 border-transparent'
                        }`}
                        disabled={!isFavorite && favorites.length >= 12}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {isFavorite && '⭐'}
                          {currency.toUpperCase()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 text-sm">
                    Current Favorites ({favorites.length}/12):
                  </span>
                </div>

                {favorites.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {favorites.map((currency) => (
                      <div
                        key={currency}
                        className="flex items-center gap-1 bg-yellow-500/70 rounded-md px-2 py-1"
                      >
                        <span className="text-white text-xs font-medium">
                          {currency.toUpperCase()}
                        </span>
                        <button
                          onClick={() => removeFromFavorites(currency)}
                          className="text-white/80 hover:text-white ml-1"
                          title="Remove from favorites"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-sm mb-4">No favorites selected</p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setFavorites([])}
                    className="flex-1 bg-red-500/70 hover:bg-red-600/70 text-white px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFavoritesModal(false)}
                    className="flex-1 bg-green-500/70 hover:bg-green-600/70 text-white px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
