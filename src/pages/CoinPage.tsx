import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";

function CoinPage() {
  const { id } = useParams<Params>();
  const [coinData, setCoinData] = useState<any>(null);
  const [days, setDays] = useState<string>("1"); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-zrvaTAkk5tvRn9Ks42hRtLVf&vs_currency=usd`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const result = await response.json();
        setCoinData(result);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDays: string = e.target.value;
    setDays(selectedDays);
  };

  return (
    <div className="w-4/5 mx-auto">
      {coinData && (
        <div className="flex flex-col justify-center">
          <div className="flex gap-28 items-center justify-center">
            <img className="w-20 h-20" src={coinData.image.small} alt="" />
            <h2 className="text-xl">{coinData.name}</h2>
            <div className="flex gap-20">
        <p>
          {coinData.market_data.price_change_percentage_24h > 0 ? (
            <span className="text-green-500 text-xl">+{coinData.market_data.price_change_percentage_24h}%</span>
          ) : (
            <span className="text-red-500 text-xl">{coinData.market_data.price_change_percentage_24h}%</span>
          )}
        </p>
        {coinData.market_data.price_change_percentage_24h > 0 ? (
          <BsGraphUpArrow style={{ color: 'green', fontSize:'30px' }} />
        ) : (
          <BsGraphDownArrow style={{ color: 'red', fontSize:'30px' }} />
        )}
      </div>
            <p className="text-xl">{coinData.market_data.market_cap.usd}</p>
            <p className="text-xl">{coinData.market_data.total_volume.usd}</p>
          </div>
          <select className="w-1/6 mt-4 p-3" value={days} onChange={handleChange}>
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
          {days && <CoinChart id={id} days={days} />}
          <div className="text-center mt-4">{coinData.description.en}</div>
        </div>
      )}
    </div>
  );
}

export default CoinPage;
