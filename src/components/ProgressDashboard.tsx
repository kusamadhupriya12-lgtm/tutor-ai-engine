import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Award, Target, BookOpen, Clock, Brain, Calendar } from "lucide-react";

interface ProgressMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

interface Subject {
  name: string;
  progress: number;
  score: number;
  assessments: number;
  timeSpent: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
}

export const ProgressDashboard = () => {
  const metrics: ProgressMetric[] = [
    {
      label: 'Overall Score',
      value: 85,
      change: +5,
      trend: 'up',
      icon: Award
    },
    {
      label: 'Assessments Completed',
      value: 12,
      change: +3,
      trend: 'up',
      icon: Target
    },
    {
      label: 'Study Time (hrs)',
      value: 24,
      change: +2,
      trend: 'up',
      icon: Clock
    },
    {
      label: 'Learning Streak',
      value: 7,
      change: +1,
      trend: 'up',
      icon: Calendar
    }
  ];

  const subjects: Subject[] = [
    {
      name: 'Machine Learning',
      progress: 85,
      score: 92,
      assessments: 5,
      timeSpent: 480,
      difficulty: 'medium'
    },
    {
      name: 'Data Science',
      progress: 70,
      score: 78,
      assessments: 3,
      timeSpent: 240,
      difficulty: 'hard'
    },
    {
      name: 'Statistics',
      progress: 95,
      score: 88,
      assessments: 4,
      timeSpent: 360,
      difficulty: 'easy'
    },
    {
      name: 'Deep Learning',
      progress: 45,
      score: 75,
      assessments: 2,
      timeSpent: 180,
      difficulty: 'hard'
    }
  ];

  const recentActivity = [
    {
      type: 'assessment',
      title: 'Completed "Neural Networks Basics"',
      score: 95,
      date: '2 hours ago',
      difficulty: 'medium'
    },
    {
      type: 'study',
      title: 'Studied "Backpropagation Algorithm"',
      duration: 45,
      date: '1 day ago',
      difficulty: 'hard'
    },
    {
      type: 'achievement',
      title: 'Earned "Statistics Master" badge',
      date: '2 days ago',
      difficulty: 'easy'
    },
    {
      type: 'assessment',
      title: 'Completed "Linear Regression"',
      score: 82,
      date: '3 days ago',
      difficulty: 'easy'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary text-secondary-foreground';
      case 'medium': return 'bg-learning-warning text-white';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment': return Target;
      case 'study': return BookOpen;
      case 'achievement': return Award;
      default: return Brain;
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Progress Analytics</h2>
        <p className="text-muted-foreground">
          Track your learning journey with detailed insights and metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="shadow-elegant bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-secondary' : 'text-destructive'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{metric.change > 0 ? '+' : ''}{metric.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
            <CardDescription>Your performance across different topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{subject.name}</h4>
                    <Badge className={getDifficultyColor(subject.difficulty)}>
                      {subject.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{subject.score}% avg</span>
                    <span>{subject.assessments} tests</span>
                    <span>{formatTime(subject.timeSpent)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              
              return (
                <div key={index} className="flex items-center space-x-4 p-3 bg-accent/30 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'assessment' ? 'bg-primary/20' :
                    activity.type === 'study' ? 'bg-learning-info/20' :
                    'bg-secondary/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      activity.type === 'assessment' ? 'text-primary' :
                      activity.type === 'study' ? 'text-learning-info' :
                      'text-secondary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span>{activity.date}</span>
                      {'score' in activity && (
                        <Badge variant="secondary">{activity.score}%</Badge>
                      )}
                      {'duration' in activity && (
                        <span>{activity.duration} minutes</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered analysis of your learning patterns</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-secondary">Strengths</h4>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Consistent high performance in Statistics</li>
              <li>• Strong grasp of fundamental concepts</li>
              <li>• Regular study habits</li>
            </ul>
          </div>

          <div className="p-4 bg-learning-warning/10 rounded-lg border border-learning-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-learning-warning" />
              <h4 className="font-semibold text-learning-warning">Areas to Focus</h4>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Deep Learning concepts need more practice</li>
              <li>• Complex mathematical proofs</li>
              <li>• Advanced optimization techniques</li>
            </ul>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-primary">Recommendations</h4>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Take more Deep Learning assessments</li>
              <li>• Review neural network architectures</li>
              <li>• Practice with real-world datasets</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};