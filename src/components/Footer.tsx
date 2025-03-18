
const Footer = () => {
  return (
    <footer className="bg-white shadow-sm py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Grade Calculator - An educational tool
      </div>
    </footer>
  );
};

export default Footer;
