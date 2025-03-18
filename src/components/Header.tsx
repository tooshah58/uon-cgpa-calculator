
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grade Calculator</h1>
          <p className="text-sm text-gray-600">University of Narowal</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
