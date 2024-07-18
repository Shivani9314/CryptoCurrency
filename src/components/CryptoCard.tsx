import React from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { Link } from 'react-router-dom';

type CryptoProps = {
  id: string;
  symbol:string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
};

interface CryptoCardProps {
  coinData: CryptoProps;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ coinData }) => {
  return (
    <Link to={`coins/${coinData.id}`}>
    <div className='flex flex-col gap-5 w-[300px] h-[300px] p-6 shadow-lg'> 
      <div className='flex gap-5'>
      <img className='w-[70px]' src={coinData.image} alt={coinData.name} />
      <div>
      <p className='mt-2 text-2xl'>{coinData.symbol.toUpperCase()}-USD</p>
      <p>{coinData.name}</p>
      </div>
      </div>
      <div className='flex flex-col gap-2'>
      <div className="flex gap-20">
        <p>
          {coinData.price_change_percentage_24h > 0 ? (
            <span className="text-green-500 text-xl">+{coinData.price_change_percentage_24h}%</span>
          ) : (
            <span className="text-red-500 text-xl">{coinData.price_change_percentage_24h}%</span>
          )}
        </p>
        {coinData.price_change_percentage_24h > 0 ? (
          <BsGraphUpArrow style={{ color: 'green', fontSize:'30px' }} />
        ) : (
          <BsGraphDownArrow style={{ color: 'red', fontSize:'30px' }} />
        )}
      </div>
      <p className='mt-5'> ${coinData.current_price}</p>
      <p>Market Cap: ${coinData.market_cap}</p>
      <p>Total Volume: ${coinData.total_volume}</p>
      </div>
    </div>
    </Link>
  );
};

export default CryptoCard;
