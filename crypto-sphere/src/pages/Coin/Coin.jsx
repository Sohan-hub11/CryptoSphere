import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-x5e1gdhqehaKri77Tt2xZtcW' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () => {
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-x5e1gdhqehaKri77Tt2xZtcW' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>

        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hr High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hr Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>All Time High</li>
            <li>{currency.symbol} {coinData.market_data.ath[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>All Time High Date</li>
            <li>{coinData.market_data.ath_date[currency.name].toLocaleString().slice(0, -14)}</li>
          </ul>
          <ul>
            <li>All Time Low</li>
            <li>{currency.symbol} {coinData.market_data.atl[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>All Time Low Date</li>
            <li>{coinData.market_data.atl_date[currency.name].toLocaleString().slice(0, -14)}</li>
          </ul>
          <ul>
            <li>Total Volume</li>
            <li>{currency.symbol} {coinData.market_data.total_volume[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    )
  }

}

export default Coin
