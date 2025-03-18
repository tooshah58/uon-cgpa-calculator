
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ResultDisplay from "./ResultDisplay";
import GradeTable from "./GradeTable";

const GradeCalculator = () => {
  const [marks, setMarks] = useState<string>("");
  const [result, setResult] = useState<{
    grade: string;
    points: number;
    remarks: string;
  } | null>(null);
  const { toast } = useToast();

  const calculateGrade = (marks: number) => {
    if (marks >= 84.5) return { grade: "A+", points: 4.0, remarks: "Exceptional" };
    if (marks >= 79.5) return { grade: "A", points: 3.7, remarks: "Outstanding" };
    if (marks >= 74.5) return { grade: "B+", points: 3.4, remarks: "Excellent" };
    if (marks >= 69.5) return { grade: "B", points: 3.0, remarks: "Very Good" };
    if (marks >= 64.5) return { grade: "B-", points: 2.5, remarks: "Good" };
    if (marks >= 59.5) return { grade: "C+", points: 2.0, remarks: "Average" };
    if (marks >= 54.5) return { grade: "C", points: 1.5, remarks: "Satisfactory" };
    if (marks >= 49.5) return { grade: "D", points: 1.0, remarks: "Pass" };
    return { grade: "F", points: 0.0, remarks: "Fail" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numericMarks = parseFloat(marks);
    
    if (isNaN(numericMarks)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number for marks.",
        variant: "destructive",
      });
      return;
    }
    
    if (numericMarks < 0 || numericMarks > 100) {
      toast({
        title: "Out of Range",
        description: "Marks should be between 0 and 100.",
        variant: "destructive",
      });
      return;
    }
    
    setResult(calculateGrade(numericMarks));
    
    toast({
      title: "Grade Calculated",
      description: "Your grade has been calculated successfully.",
    });
  };

  const handleReset = () => {
    setMarks("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Calculate Your Grade</CardTitle>
              <CardDescription>Enter your marks (0-100) to calculate your grade and GPA points</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <Input
                    id="marks"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="Enter your marks (e.g., 75.5)"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Calculate
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {result && <ResultDisplay result={result} />}
        </div>
        
        <div>
          <GradeTable />
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;
