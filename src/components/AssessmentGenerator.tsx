import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlayCircle, CheckCircle, Clock, Target, BookOpen, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;  // in minutes
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  status: 'available' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: Date;
}

const sampleAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Test your understanding of basic ML concepts including supervised learning, unsupervised learning, and neural networks.',
    questions: [
      {
        id: '1',
        question: 'What is the primary goal of supervised learning?',
        options: [
          'To find hidden patterns in data',
          'To learn from labeled training data to make predictions',
          'To reduce the dimensionality of data',
          'To cluster similar data points together'
        ],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs, enabling predictions on new, unseen data.',
        difficulty: 'easy',
        topic: 'Supervised Learning'
      },
      {
        id: '2',
        question: 'Which of the following is NOT a common activation function in neural networks?',
        options: [
          'ReLU (Rectified Linear Unit)',
          'Sigmoid',
          'Tanh',
          'Linear Regression'
        ],
        correctAnswer: 3,
        explanation: 'Linear Regression is a machine learning algorithm, not an activation function. ReLU, Sigmoid, and Tanh are all common activation functions used in neural networks.',
        difficulty: 'medium',
        topic: 'Neural Networks'
      }
    ],
    timeLimit: 30,
    difficulty: 'mixed',
    status: 'available'
  },
  {
    id: '2',
    title: 'Data Science Statistics',
    description: 'Comprehensive assessment covering statistical concepts essential for data science.',
    questions: [],
    timeLimit: 45,
    difficulty: 'medium',
    status: 'completed',
    score: 85,
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

export const AssessmentGenerator = () => {
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<Assessment[]>(sampleAssessments);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(assessment.timeLimit * 60); // Convert to seconds
    setShowResults(false);
    
    // Update assessment status
    setAssessments(prev => prev.map(a => 
      a.id === assessment.id 
        ? { ...a, status: 'in-progress' as const }
        : a
    ));
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentAssessment && currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitAssessment = () => {
    if (!currentAssessment) return;

    const correctAnswers = currentAssessment.questions.reduce((acc, question) => {
      const userAnswer = answers[question.id];
      return acc + (userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / currentAssessment.questions.length) * 100);

    setAssessments(prev => prev.map(a => 
      a.id === currentAssessment.id 
        ? { 
            ...a, 
            status: 'completed' as const,
            score,
            completedAt: new Date()
          }
        : a
    ));

    setShowResults(true);

    toast({
      title: "Assessment completed!",
      description: `You scored ${score}% (${correctAnswers}/${currentAssessment.questions.length} correct)`,
    });
  };

  const generateNewAssessment = () => {
    // Simulated assessment generation
    const topics = ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      title: `${randomTopic} Assessment`,
      description: `Auto-generated assessment covering key concepts in ${randomTopic}.`,
      questions: [], // Would be populated by AI
      timeLimit: 20,
      difficulty: 'mixed',
      status: 'available'
    };

    setAssessments(prev => [newAssessment, ...prev]);

    toast({
      title: "New assessment generated!",
      description: `Created "${newAssessment.title}" based on your uploaded documents.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-secondary';
      case 'medium': return 'text-learning-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentAssessment && !showResults) {
    const currentQuestion = currentAssessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100;

    return (
      <div className="max-w-4xl space-y-6">
        {/* Assessment Header */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentAssessment.title}</CardTitle>
                <CardDescription>
                  Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
                </CardDescription>
              </div>
              <div className="text-right">
                {timeRemaining && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                )}
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="secondary">{currentQuestion.topic}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
            
            <RadioGroup
              value={answers[currentQuestion.id]?.toString()}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-smooth">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                <Button onClick={submitAssessment} className="shadow-primary">
                  Submit Assessment
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="shadow-primary">
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Take Assessment</h2>
          <p className="text-muted-foreground">
            Test your knowledge with AI-generated questions from your documents.
          </p>
        </div>
        <Button onClick={generateNewAssessment} className="shadow-primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate New Assessment
        </Button>
      </div>

      {/* Available Assessments */}
      <div className="grid gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${assessment.status === 'completed' ? 'bg-secondary/20' : 'bg-primary/20'}`}>
                    {assessment.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    ) : (
                      <Target className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{assessment.title}</CardTitle>
                    <CardDescription className="mt-1">{assessment.description}</CardDescription>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  {assessment.status === 'completed' && assessment.score && (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {assessment.score}%
                    </Badge>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{assessment.timeLimit} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{assessment.questions.length || '10+'} questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className={getDifficultyColor(assessment.difficulty)}>
                    {assessment.difficulty} difficulty
                  </Badge>
                  {assessment.completedAt && (
                    <span className="text-sm text-muted-foreground">
                      Completed {assessment.completedAt.toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <Button
                  onClick={() => startAssessment(assessment)}
                  disabled={assessment.status === 'in-progress'}
                  className="shadow-primary"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {assessment.status === 'completed' ? 'Retake' : 'Start Assessment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {assessments.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assessments Available</h3>
            <p className="text-muted-foreground mb-4">
              Upload some documents first to generate personalized assessments.
            </p>
            <Button onClick={generateNewAssessment} className="shadow-primary">
              Generate Sample Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};