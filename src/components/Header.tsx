
import { BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-green-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <BookOpen className="h-8 w-8 text-white mr-3" />
        <div>
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
            <span className="font-engravers">University of Narowal</span>
          </h1>
          <p className="text-sm text-green-100">GPA & CGPA Calculator</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
