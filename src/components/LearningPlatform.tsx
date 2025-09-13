import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, BookOpen, Target, TrendingUp, Brain, FileText, Award, Clock } from "lucide-react";
import { DocumentUploader } from "./DocumentUploader";
import { AssessmentGenerator } from "./AssessmentGenerator";
import { ProgressDashboard } from "./ProgressDashboard";
import { StudyRecommendations } from "./StudyRecommendations";

type View = 'overview' | 'upload' | 'assessment' | 'progress' | 'recommendations';

export const LearningPlatform = () => {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [userProgress] = useState({
    totalDocuments: 12,
    completedAssessments: 8,
    averageScore: 85,
    studyStreak: 7,
  });

  const navigationItems = [
    { id: 'overview' as View, label: 'Overview', icon: BookOpen },
    { id: 'upload' as View, label: 'Upload Documents', icon: Upload },
    { id: 'assessment' as View, label: 'Take Assessment', icon: Target },
    { id: 'progress' as View, label: 'Progress Analytics', icon: TrendingUp },
    { id: 'recommendations' as View, label: 'Study Guide', icon: Brain },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'upload':
        return <DocumentUploader />;
      case 'assessment':
        return <AssessmentGenerator />;
      case 'progress':
        return <ProgressDashboard />;
      case 'recommendations':
        return <StudyRecommendations />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative p-8 rounded-xl bg-gradient-hero text-white overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4">Adaptive Learning Platform</h1>
                <p className="text-lg opacity-90 mb-6">
                  Upload documents, generate assessments, and track your learning progress with AI-powered insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => setCurrentView('upload')}
                    className="shadow-elegant"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('assessment')}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 rounded-l-full"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-card shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Documents</p>
                      <p className="text-2xl font-bold">{userProgress.totalDocuments}</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{userProgress.completedAssessments}</p>
                    </div>
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold">{userProgress.averageScore}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-learning-progress" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                      <p className="text-2xl font-bold">{userProgress.studyStreak} days</p>
                    </div>
                    <Clock className="w-8 h-8 text-learning-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Completed "Machine Learning Basics" assessment</span>
                  </div>
                  <Badge variant="secondary">95%</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Uploaded "Deep Learning Research Paper"</span>
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-learning-progress rounded-full"></div>
                    <span>Generated 10 questions from "Data Science Fundamentals"</span>
                  </div>
                  <Badge variant="outline">Ready</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h2 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                LearnAI
              </h2>
              <div className="hidden md:flex space-x-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                        currentView === item.id
                          ? 'bg-primary text-primary-foreground shadow-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* User Progress Indicator */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Learning Progress</span>
                  <Progress value={75} className="w-20" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
    </div>
  );
};