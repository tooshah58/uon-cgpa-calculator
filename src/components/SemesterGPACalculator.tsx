
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Book = {
  id: number;
  name: string;
  credit: number;
  grade: string;
  gradePoints: number;
};

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  "A": 3.7,
  "B+": 3.4,
  "B": 3.0,
  "B-": 2.5,
  "C+": 2.0,
  "C": 1.5,
  "D": 1.0,
  "F": 0.0,
};

const SemesterGPACalculator = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "Book 1", credit: 3, grade: "", gradePoints: 0 },
    { id: 2, name: "Book 2", credit: 3, grade: "", gradePoints: 0 },
    { id: 3, name: "Book 3", credit: 3, grade: "", gradePoints: 0 },
    { id: 4, name: "Book 4", credit: 3, grade: "", gradePoints: 0 },
    { id: 5, name: "Book 5", credit: 3, grade: "", gradePoints: 0 },
    { id: 6, name: "Book 6", credit: 3, grade: "", gradePoints: 0 },
  ]);
  
  const [gpa, setGpa] = useState<number | null>(null);

  const handleGradeChange = (id: number, grade: string) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id 
          ? { ...book, grade, gradePoints: gradePoints[grade] } 
          : book
      )
    );
  };

  const calculateGPA = () => {
    // Check if all books have grades
    const allGradesEntered = books.every(book => book.grade);
    
    if (!allGradesEntered) {
      toast({
        title: "Missing Grades",
        description: "Please enter grades for all books.",
        variant: "destructive",
      });
      return;
    }

    // Calculate GPA: sum of (credit * grade points) / total credits
    const totalCredits = books.reduce((sum, book) => sum + book.credit, 0);
    const weightedGradePoints = books.reduce((sum, book) => sum + (book.credit * book.gradePoints), 0);
    const calculatedGPA = weightedGradePoints / totalCredits;
    
    setGpa(calculatedGPA);
    
    toast({
      title: "GPA Calculated",
      description: "Your semester GPA has been calculated successfully.",
    });
  };

  const resetCalculator = () => {
    setBooks(books.map(book => ({ ...book, grade: "", gradePoints: 0 })));
    setGpa(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700">Semester GPA Calculator</CardTitle>
        <CardDescription>Enter the grade for each of your six books to calculate your semester GPA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Credit Hours</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.name}</TableCell>
                  <TableCell>{book.credit}</TableCell>
                  <TableCell>
                    <Select
                      value={book.grade}
                      onValueChange={(value) => handleGradeChange(book.id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="C+">C+</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={calculateGPA} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Calculate GPA
          </Button>
          <Button 
            onClick={resetCalculator} 
            variant="outline"
          >
            Reset
          </Button>
        </div>
        
        {gpa !== null && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h3 className="text-lg font-semibold text-blue-800 mb-1">Your Semester GPA</h3>
            <p className="text-3xl font-bold text-blue-700">{gpa.toFixed(2)}</p>
            <p className="text-sm text-blue-600 mt-1">
              Based on the grades you entered for all six books.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SemesterGPACalculator;
