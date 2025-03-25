
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
import { PlusCircle, Trash2, Calculator, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Course = {
  id: number;
  name: string;
  credit: number;
  grade: string;
  gradePoints: number;
  isImproved: boolean;
  previousGrade: string;
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
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
    { id: 2, name: "Course 2", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
    { id: 3, name: "Course 3", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
    { id: 4, name: "Course 4", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
    { id: 5, name: "Course 5", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
    { id: 6, name: "Course 6", credit: 3, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" },
  ]);
  
  const [gpa, setGpa] = useState<number | null>(null);
  const [nextId, setNextId] = useState(7); // Track the next available ID
  
  // State for CGPA calculation - show it by default
  const [previousCGPA, setPreviousCGPA] = useState<string>("");
  const [previousCreditHours, setPreviousCreditHours] = useState<string>("");
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [showCGPASection, setShowCGPASection] = useState<boolean>(true);

  const handleGradeChange = (id: number, grade: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === id 
          ? { ...course, grade, gradePoints: gradePoints[grade] } 
          : course
      )
    );
  };

  const handleCreditChange = (id: number, credit: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === id 
          ? { ...course, credit: parseInt(credit) } 
          : course
      )
    );
  };

  const handlePreviousGradeChange = (id: number, grade: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id
          ? { ...course, previousGrade: grade }
          : course
      )
    );
  };

  const toggleImproved = (id: number) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id
          ? { ...course, isImproved: !course.isImproved, previousGrade: !course.isImproved ? "" : course.previousGrade }
          : course
      )
    );
  };

  const addCourse = () => {
    const newCourse = { 
      id: nextId, 
      name: `Course ${nextId}`, 
      credit: 3, 
      grade: "", 
      gradePoints: 0,
      isImproved: false,
      previousGrade: ""
    };
    setCourses([...courses, newCourse]);
    setNextId(nextId + 1);
    
    toast({
      title: "Course Added",
      description: "A new course has been added to the calculator.",
    });
  };

  const removeCourse = (id: number) => {
    // Prevent removing if only one course left
    if (courses.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You need at least one course in the calculator.",
        variant: "destructive",
      });
      return;
    }
    
    setCourses(courses.filter(course => course.id !== id));
    
    toast({
      title: "Course Removed",
      description: "The course has been removed from the calculator.",
    });
  };

  const calculateGPA = () => {
    // Check if all courses have grades
    const allGradesEntered = courses.every(course => course.grade);
    
    if (!allGradesEntered) {
      toast({
        title: "Missing Grades",
        description: "Please enter grades for all courses.",
        variant: "destructive",
      });
      return;
    }

    // Check if improved courses have previous grades
    const allImprovedCoursesHavePreviousGrades = courses
      .filter(course => course.isImproved)
      .every(course => course.previousGrade);
    
    if (!allImprovedCoursesHavePreviousGrades) {
      toast({
        title: "Missing Previous Grades",
        description: "Please enter previous grades for all improved courses.",
        variant: "destructive",
      });
      return;
    }

    // Calculate GPA: sum of (credit * grade points) / total credits
    const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0);
    const weightedGradePoints = courses.reduce((sum, course) => sum + (course.credit * course.gradePoints), 0);
    const calculatedGPA = weightedGradePoints / totalCredits;
    
    setGpa(calculatedGPA);
    
    toast({
      title: "GPA Calculated",
      description: "Your semester GPA has been calculated successfully.",
    });
  };

  const calculateCGPA = () => {
    // Validate inputs
    if (!previousCGPA || !previousCreditHours || isNaN(parseFloat(previousCGPA)) || isNaN(parseFloat(previousCreditHours))) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid previous CGPA and credit hours.",
        variant: "destructive",
      });
      return;
    }

    // Make sure semester GPA is calculated first
    if (gpa === null) {
      toast({
        title: "Calculate Semester GPA First",
        description: "Please calculate your semester GPA before calculating CGPA.",
        variant: "destructive",
      });
      return;
    }

    const prevCGPA = parseFloat(previousCGPA);
    const prevCredits = parseFloat(previousCreditHours);
    
    // Get current semester credits
    const currentCredits = courses.reduce((sum, course) => sum + course.credit, 0);
    
    // Calculate CGPA based on improved courses
    let adjustedPrevCGPA = prevCGPA;
    
    // If there are improved courses, adjust the previous CGPA
    const improvedCourses = courses.filter(course => course.isImproved && course.previousGrade);
    
    if (improvedCourses.length > 0) {
      // Calculate the impact of improved courses on previous CGPA
      const improvedCredits = improvedCourses.reduce((sum, course) => sum + course.credit, 0);
      const improvementEffect = improvedCourses.reduce((sum, course) => {
        const prevPoints = gradePoints[course.previousGrade] || 0;
        const newPoints = course.gradePoints;
        return sum + ((newPoints - prevPoints) * course.credit);
      }, 0);
      
      // Adjust previous CGPA based on improved courses
      adjustedPrevCGPA = ((prevCGPA * prevCredits) + improvementEffect) / prevCredits;
    }
    
    // Calculate CGPA with the adjusted values
    const calculatedCGPA = ((adjustedPrevCGPA * prevCredits) + (gpa * currentCredits)) / (prevCredits + currentCredits);
    
    setCgpa(calculatedCGPA);
    
    toast({
      title: "CGPA Calculated",
      description: "Your cumulative GPA has been calculated successfully.",
    });
  };

  const resetCalculator = () => {
    setCourses(courses.map(course => ({ ...course, grade: "", gradePoints: 0, isImproved: false, previousGrade: "" })));
    setGpa(null);
    setCgpa(null);
    setPreviousCGPA("");
    setPreviousCreditHours("");
  };

  const toggleCGPASection = () => {
    setShowCGPASection(!showCGPASection);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700">Semester GPA Calculator</CardTitle>
        <CardDescription>Enter the grade for each of your courses to calculate your semester GPA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CGPA Calculator Section - Shown by default */}
        <div className="p-5 border border-blue-200 rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Cumulative GPA Calculator</h3>
          <p className="text-sm text-blue-600 mb-4">
            Enter your previous CGPA and total credit hours to calculate your new CGPA
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="previousCGPA">Previous CGPA</Label>
              <Input
                id="previousCGPA"
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="e.g. 3.5"
                value={previousCGPA}
                onChange={(e) => setPreviousCGPA(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousCredits">Total Credit Hours Completed</Label>
              <Input
                id="previousCredits"
                type="number"
                min="0"
                placeholder="e.g. 60"
                value={previousCreditHours}
                onChange={(e) => setPreviousCreditHours(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
          
          <Button 
            onClick={calculateCGPA}
            className="bg-blue-600 hover:bg-blue-700 mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate CGPA
          </Button>
          
          {cgpa !== null && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-200 rounded-md">
              <h4 className="text-lg font-semibold text-blue-800 mb-1">Your New CGPA</h4>
              <p className="text-3xl font-bold text-blue-700">{cgpa.toFixed(2)}</p>
              <p className="text-sm text-blue-600 mt-1">
                This includes your current semester performance.
              </p>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Credit Hours</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Repeat/Improve</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    <Select
                      value={course.credit.toString()}
                      onValueChange={(value) => handleCreditChange(course.id, value)}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Credit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={course.grade}
                      onValueChange={(value) => handleGradeChange(course.id, value)}
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
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={course.isImproved ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleImproved(course.id)}
                        className={`flex gap-1 ${course.isImproved ? 'bg-green-600 hover:bg-green-700' : 'text-green-600 hover:bg-green-50'}`}
                      >
                        <RefreshCw className="h-3 w-3" />
                        {course.isImproved ? "Improved" : "Improve"}
                      </Button>
                      {course.isImproved && (
                        <Select
                          value={course.previousGrade}
                          onValueChange={(value) => handlePreviousGradeChange(course.id, value)}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Previous" />
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
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeCourse(course.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex flex-wrap gap-3">
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
          <Button 
            onClick={addCourse}
            variant="outline"
            className="ml-auto flex gap-1 text-green-600 border-green-200 hover:bg-green-50"
          >
            <PlusCircle className="h-4 w-4" />
            Add Course
          </Button>
          <Button
            onClick={toggleCGPASection}
            variant="outline"
            className="flex gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Calculator className="h-4 w-4" />
            {showCGPASection ? "Hide CGPA Calculator" : "Show CGPA Calculator"}
          </Button>
        </div>
        
        {gpa !== null && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h3 className="text-lg font-semibold text-blue-800 mb-1">Your Semester GPA</h3>
            <p className="text-3xl font-bold text-blue-700">{gpa.toFixed(2)}</p>
            <p className="text-sm text-blue-600 mt-1">
              Based on the grades you entered for all your courses.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SemesterGPACalculator;
