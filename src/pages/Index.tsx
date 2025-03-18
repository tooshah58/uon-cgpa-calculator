
import SemesterGPACalculator from "@/components/SemesterGPACalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SemesterGPACalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
