import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around border-t border-[#e8d5ce] px-4 py-2">
      <a className="flex flex-col items-center justify-center text-[#1c110d]" href="menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1c110d" viewBox="0 0 24 24">
          <path d="M12 7C9.8 7 8 8.8 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 8.8 14.2 7 12 7zM12 17C8.7 17 6 14.3 6 11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11C18 14.3 15.3 17 12 17zM4 20H20V22H4V20z"/>
        </svg>
        <p className="text-xs font-bold">Menu</p>
      </a>
      <a className="flex flex-col items-center justify-center text-[#9c5e49]" href="order">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9c5e49" viewBox="0 0 24 24">
          <path d="M4 6H20V8H4V6zM4 11H16V13H4V11zM4 16H12V18H4V16z"/>
        </svg>
        <p className="text-xs font-bold">Order</p>
      </a>
    </nav>
  );
};

export default Navbar;
