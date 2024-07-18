import { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";
import SearchInput from "../components/SearchInput";
import Sort from "../components/Sort";

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

function HomePage() {
  const [cryptoData, setCryptoData] = useState<CryptoProps[]>([]);
  const [searchQuery , setSearchQuery] = useState<string>('');
  const [sortByProfit, setSortByProfit] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-zrvaTAkk5tvRn9Ks42hRtLVf&vs_currency=usd"
      );
      const result = await response.json();
      setCryptoData(result);
    };
    fetchData();
  }, []);

  const handleSearch = (coinName: string) => {
    setSearchQuery(coinName);
  };

  const handleSortByProfit = (order: string) => {
    setSortByProfit(order as "asc" | "desc" | null);
  };

  const filteredCoinsData = () => {
    let filteredCoins: CryptoProps[] = cryptoData;

    if (searchQuery) {
      filteredCoins = cryptoData.filter((crypto) =>
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortByProfit) {
      filteredCoins = filteredCoins.sort((a, b) => {
        if (sortByProfit === "asc") {
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        } else if (sortByProfit === "desc") {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }
        return 0;
      });
    }

    return filteredCoins;
  };

  const filteredCoins = filteredCoinsData();


  return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex w-full justify-around">
        <SearchInput onSearch = {handleSearch}/>
        <Sort onSort={handleSortByProfit}/>
        </div>
        <div className="flex flex-wrap gap-20 p-3 border-3 justify-center">
        {filteredCoins.map((crypto) => ( 
          <CryptoCard key={crypto.id} coinData={crypto} />
        ))}
      </div>
      </div>
  );
}

export default HomePage;
