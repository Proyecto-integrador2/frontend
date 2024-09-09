const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around border-t border-[#e8d5ce] px-4 py-2">
      {/* Icono para el menú */}
      <a className="flex flex-col items-center justify-center text-[#1c110d]" href="menu">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
          <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
        </svg>          
        <p className="text-xs font-bold">Menu</p>
      </a>

      {/* Icono para las órdenes */}
      <a className="flex flex-col items-center justify-center text-black" href="order">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
          <path d="M4 6H20V8H4V6zM4 11H16V13H4V11zM4 16H12V18H4V16z"/>
        </svg>
        <p className="text-xs font-bold">Order</p>
      </a>
    </nav>
  );
};

export default Navbar;
