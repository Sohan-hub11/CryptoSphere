import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to world's largest cryptocurrency marketplace. Sign up to explaore more about cryptos</p>
        <form>
          <input type="text" placeholder='Search crypto...' />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>

            </div>

          ))
        }

      </div>
    </div>
  )
}
import './Home.css'
import { CoinContext } from '../../context/CoinContext'

export default Home
