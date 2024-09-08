import React from 'react';
import Navbar from '../components/Navbar';

const Menu = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#fcf9f8] justify-between overflow-x-hidden" style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
      < Navbar />
      {/* Search Bar */}
      <div className="px-4 py-3">
        <label className="flex flex-col w-full h-12">
          <div className="flex w-full items-center rounded-xl h-full bg-[#f4eae7]">
            <div className="pl-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input placeholder="Search for a drink" className="form-input flex-1 rounded-r-xl text-[#1c110d] bg-[#f4eae7] px-4 h-full placeholder:text-[#9c5e49] focus:outline-none" />
          </div>
        </label>
      </div>

      {/* Category Tabs */}
      <div className="pb-3">
        <div className="flex border-b border-[#e8d5ce] px-4 gap-8 overflow-auto">
          <a className="flex flex-col items-center justify-center border-b-4 border-[#f2460d] text-[#1c110d] pb-4 pt-4" href="menu">
            <p className="text-sm font-bold">All</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-4 border-transparent text-[#9c5e49] pb-4 pt-4" href="menu/Whisky">
            <p className="text-sm font-bold">Whisky</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-4 border-transparent text-[#9c5e49] pb-4 pt-4" href="menu/Vodka">
            <p className="text-sm font-bold">Vodka</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-4 border-transparent text-[#9c5e49] pb-4 pt-4" href="menu/Gin">
            <p className="text-sm font-bold">Gin</p>
          </a>
        </div>
      </div>

      {/* Drink Items */}
      <div className="p-4 bg-[#fcf9f8]">
        <DrinkItem
          name="Moscow Mule"
          description="Vodka, ginger beer, lime juice"
          imgUrl="https://cdn.usegalileo.ai/sdxl10/92791305-e5c3-46bd-8e6b-f1dfc58294ee.png"
        />
        <DrinkItem
          name="Whiskey Sour"
          description="Whiskey, lemon juice, sugar syrup"
          imgUrl="https://cdn.usegalileo.ai/sdxl10/4ecc1fb5-89c2-4dfc-ba2b-3ae77d793561.png"
        />
        <DrinkItem
          name="Margarita"
          description="Tequila, triple sec, lime juice"
          imgUrl="https://cdn.usegalileo.ai/sdxl10/0256fda3-438d-4715-aa30-baaf0dd4395e.png"
        />
        <DrinkItem
          name="Martini"
          description="Gin, vermouth, olive"
          imgUrl="https://cdn.usegalileo.ai/sdxl10/10e247d1-2961-4bf9-b4d9-b353149a5766.png"
        />
      </div>

      {/* Order Button */}
      <div className="px-4 py-3">
        <button className="flex items-center justify-center bg-[#f2460d] text-white font-bold text-base rounded-full h-12 px-5 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
            ></path>
          </svg>
          <span className="ml-2">View Order (3)</span>
        </button>
      </div>
    </div>
  );
};

const DrinkItem = ({ name, description, imgUrl }) => (
  <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl mb-4 shadow-lg bg-white">
    <div
      className="flex-shrink-0 w-full md:w-1/3 aspect-square bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${imgUrl})` }}
    ></div>
    <div className="flex-grow flex flex-col gap-2 p-4 md:w-2/3 justify-between">
      <div>
        <p className="text-[#1c110d] text-lg font-bold">{name}</p>
        <p className="text-[#9c5e49] text-sm">{description}</p>
      </div>
      <button className="bg-[#f4eae7] text-[#1c110d] rounded-full h-10 px-6 text-sm font-medium mt-2 self-start md:self-end">
        Add to order
      </button>
    </div>
  </div>
);


export default Menu;