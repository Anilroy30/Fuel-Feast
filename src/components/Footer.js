const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-4 px-8 mt-10 shadow-md w-full text-center text-lg font-semibold">
      <p className="flex justify-center items-center gap-3">
        Created By 
        <span className="text-red-500 text-xl">❤️</span>
        <a href="https://www.linkedin.com/in/anilkumar-tech/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold text-xl">
          Anil Kumar
        </a>
        <span className="text-yellow-400 text-xl">©</span> {year} 
        <a href="https://github.com/Anilroy30" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-bold text-xl">
          🚀 Fuel<span className="text-yellow-400">&</span>Feast
        </a>
      </p>
    </footer>
  );
};

export default Footer;