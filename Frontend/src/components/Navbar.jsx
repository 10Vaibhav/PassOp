const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Op/ &gt;</span>
          </div>
        <button className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
          <a href="https://github.com/10Vaibhav" target="_blank"><img className="invert w-10 p-1" src="icons/github.svg" alt="github logo" /></a>
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
