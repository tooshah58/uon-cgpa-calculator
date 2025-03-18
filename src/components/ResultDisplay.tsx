
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ResultDisplayProps {
  result: {
    grade: string;
    points: number;
    remarks: string;
  };
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const isPassing = result.grade !== "F";
  
  return (
    <Card className={`border-l-4 ${isPassing ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {isPassing ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          )}
          Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Grade</p>
            <p className={`text-2xl font-bold ${isPassing ? "text-green-600" : "text-red-600"}`}>
              {result.grade}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">GPA Points</p>
            <p className="text-2xl font-bold text-blue-600">{result.points.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Remarks</p>
            <p className="text-lg font-medium">{result.remarks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
