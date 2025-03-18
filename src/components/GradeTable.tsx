
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GradeTable = () => {
  const gradeData = [
    { range: "84.50 and Above", grade: "A+", points: "4.00", remarks: "Exceptional" },
    { range: "79.50 - 84.49", grade: "A", points: "3.70", remarks: "Outstanding" },
    { range: "74.50 - 79.49", grade: "B+", points: "3.40", remarks: "Excellent" },
    { range: "69.50 - 74.49", grade: "B", points: "3.00", remarks: "Very Good" },
    { range: "64.50 - 69.49", grade: "B-", points: "2.50", remarks: "Good" },
    { range: "59.50 - 64.49", grade: "C+", points: "2.00", remarks: "Average" },
    { range: "54.50 - 59.49", grade: "C", points: "1.50", remarks: "Satisfactory" },
    { range: "49.50 - 54.49", grade: "D", points: "1.00", remarks: "Pass" },
    { range: "49.49 and below", grade: "F", points: "0.00", remarks: "Fail" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-blue-700">Grading Scale Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Marks Range</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="w-[25%]">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.range}</TableCell>
                  <TableCell className="font-medium">{row.grade}</TableCell>
                  <TableCell>{row.points}</TableCell>
                  <TableCell>{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeTable;
