import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  BookOpen, 
  Clock, 
  Star, 
  TrendingUp, 
  PlayCircle,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface StudyRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'practice' | 'learn' | 'assessment';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  confidence: number; // AI confidence in recommendation (0-100)
  reasons: string[];
  completed?: boolean;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  estimatedCompletion: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const StudyRecommendations = () => {
  const recommendations: StudyRecommendation[] = [
    {
      id: '1',
      title: 'Review Neural Network Backpropagation',
      description: 'Your recent assessment showed gaps in understanding backpropagation algorithm. Focus on the mathematical derivations.',
      type: 'review',
      priority: 'high',
      estimatedTime: 45,
      difficulty: 'hard',
      topic: 'Deep Learning',
      confidence: 92,
      reasons: [
        'Scored 65% on backpropagation questions',
        'Strong in forward pass but weak in gradient calculation',
        'Recommended by 3 similar learners'
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Practice Linear Algebra Problems',
      description: 'Strengthen your foundation with matrix operations and eigenvalue decomposition exercises.',
      type: 'practice',
      priority: 'high',
      estimatedTime: 30,
      difficulty: 'medium',
      topic: 'Mathematics',
      confidence: 88,
      reasons: [
        'Linear algebra is prerequisite for advanced topics',
        'Recent errors in matrix multiplication',
        'Will improve Deep Learning performance'
      ],
      completed: false
    },
    {
      id: '3',
      title: 'Learn Transformer Architecture',
      description: 'Explore the revolutionary attention mechanism and its applications in modern NLP.',
      type: 'learn',
      priority: 'medium',
      estimatedTime: 60,
      difficulty: 'hard',
      topic: 'NLP',
      confidence: 85,
      reasons: [
        'Next logical step after RNN/LSTM mastery',
        'High demand skill in current market',
        'Prerequisites completed successfully'
      ],
      completed: false
    },
    {
      id: '4',
      title: 'Take Computer Vision Assessment',
      description: 'Test your understanding of CNNs, image processing, and object detection algorithms.',
      type: 'assessment',
      priority: 'low',
      estimatedTime: 25,
      difficulty: 'medium',
      topic: 'Computer Vision',
      confidence: 78,
      reasons: [
        'Haven\'t been assessed on CV in 2 weeks',
        'Good performance in related topics',
        'Balanced assessment across all domains'
      ],
      completed: true
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      name: 'Machine Learning Engineer',
      description: 'Complete pathway from fundamentals to advanced ML engineering practices',
      progress: 68,
      totalSteps: 12,
      completedSteps: 8,
      estimatedCompletion: '3 weeks',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      name: 'Deep Learning Specialist',
      description: 'Master neural networks, CNNs, RNNs, and cutting-edge architectures',
      progress: 45,
      totalSteps: 15,
      completedSteps: 7,
      estimatedCompletion: '6 weeks',
      difficulty: 'advanced'
    },
    {
      id: '3',
      name: 'Data Science Fundamentals',
      description: 'Statistics, data analysis, and machine learning basics',
      progress: 90,
      totalSteps: 10,
      completedSteps: 9,
      estimatedCompletion: '1 week',
      difficulty: 'beginner'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-learning-warning';
      case 'low': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-learning-warning text-white';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review': return BookOpen;
      case 'practice': return Target;
      case 'learn': return Brain;
      case 'assessment': return PlayCircle;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': case 'beginner': return 'text-secondary';
      case 'medium': case 'intermediate': return 'text-learning-warning';
      case 'hard': case 'advanced': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">AI Study Recommendations</h2>
        <p className="text-muted-foreground">
          Personalized learning suggestions based on your progress and performance patterns.
        </p>
      </div>

      {/* Priority Recommendations */}
      <Card className="shadow-elegant border-l-4 border-l-destructive">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-destructive">High Priority Recommendations</CardTitle>
          </div>
          <CardDescription>
            These topics need immediate attention to improve your overall performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations
            .filter(rec => rec.priority === 'high' && !rec.completed)
            .map((rec) => {
              const Icon = getTypeIcon(rec.type);
              
              return (
                <div key={rec.id} className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-destructive/20 rounded-lg">
                        <Icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-primary/10 text-primary">
                        {rec.confidence}% match
                      </Badge>
                      <Button size="sm" className="shadow-primary">
                        Start Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{rec.estimatedTime} mins</span>
                    </span>
                    <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                      {rec.difficulty}
                    </Badge>
                    <Badge variant="outline">{rec.topic}</Badge>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Why this is recommended:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {rec.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-destructive">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All Recommendations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>All Recommendations</CardTitle>
            <CardDescription>Complete list of AI-generated study suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => {
              const Icon = getTypeIcon(rec.type);
              
              return (
                <div key={rec.id} className={`p-4 rounded-lg border transition-smooth ${
                  rec.completed 
                    ? 'bg-secondary/10 border-secondary/20' 
                    : 'bg-gradient-card hover:shadow-elegant'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        rec.completed ? 'bg-secondary/20' : 'bg-primary/20'
                      }`}>
                        {rec.completed ? (
                          <CheckCircle className="w-5 h-5 text-secondary" />
                        ) : (
                          <Icon className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${rec.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {rec.title}
                          </h4>
                          <Badge className={getPriorityBadge(rec.priority)}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {rec.description}
                        </p>
                        <div className="flex items-center space-x-3 mt-2 text-sm text-muted-foreground">
                          <span>{rec.estimatedTime} mins</span>
                          <span>{rec.topic}</span>
                          <span>{rec.confidence}% match</span>
                        </div>
                      </div>
                    </div>
                    {!rec.completed && (
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Learning Paths */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Suggested Learning Paths</CardTitle>
            <CardDescription>Structured curricula tailored to your goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPaths.map((path) => (
              <div key={path.id} className="p-4 bg-gradient-card rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{path.name}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress: {path.completedSteps}/{path.totalSteps} steps</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.estimatedCompletion}</span>
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    {path.progress > 0 ? 'Continue' : 'Start Path'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>AI Insights & Tips</CardTitle>
          <CardDescription>Personalized learning strategies based on your patterns</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-secondary">What's Working Well</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-learning-warning mt-0.5" />
                <span>You perform 23% better on assessments taken in the morning</span>
              </li>
              <li className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-learning-warning mt-0.5" />
                <span>Review sessions improve retention by 35% compared to direct practice</span>
              </li>
              <li className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-learning-warning mt-0.5" />
                <span>Your learning speed increases after completing foundational concepts</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-learning-info" />
              <h4 className="font-semibold text-learning-info">Optimization Tips</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-primary mt-0.5" />
                <span>Focus on one topic at a time for better knowledge retention</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-primary mt-0.5" />
                <span>Take breaks every 45 minutes to maintain peak performance</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-primary mt-0.5" />
                <span>Practice with real datasets to improve practical understanding</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};