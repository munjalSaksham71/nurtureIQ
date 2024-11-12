import { Link } from 'react-router-dom';
import { Bot, BookOpen, Rocket, Music, Brain, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const courses = [
  {
    id: 'gen-ai',
    title: 'Generative AI Basics',
    description: 'Learn the fundamentals of Generative AI, including LLMs and text-to-image generation.',
    icon: Bot,
    level: 'Beginner',
    category: 'Artificial Intelligence',
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Master calculus from foundations through multivariable calculus.',
    icon: BookOpen,
    level: 'Advanced',
    category: 'Mathematics',
  },
  {
    id: 'startup',
    title: 'Launch a Startup',
    description: 'Learn how to validate ideas and launch a successful startup.',
    icon: Rocket,
    level: 'Intermediate',
    category: 'Business',
  },
  {
    id: 'music',
    title: 'Science of Music',
    description: 'Explore the physics and mathematics behind music theory.',
    icon: Music,
    level: 'Beginner',
    category: 'Science',
  },
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI',
    description: 'Master the fundamentals of machine learning and artificial intelligence.',
    icon: Brain,
    level: 'Intermediate',
    category: 'Computer Science',
  },
  {
    id: 'business',
    title: 'Entrepreneurship Foundations',
    description: 'Learn the fundamentals of entrepreneurship and business models.',
    icon: Briefcase,
    level: 'Beginner',
    category: 'Business',
  },
];

export default function HomePage() {
  return (
    <div className="px-4 py-8">
    <div className="flex flex-col items-center margin-top-10 text-center">
      <h1 className="text-4xl font-bold">Unlock Knowledge from Anywhere</h1>
      <p className="max-w-2xl text-lg text-muted-foreground my-4">
        Empowering learners to explore diverse paths in knowledge, 
        anytime, anywhere. Join us in democratizing education for all.
      </p>
      <div className="w-full max-w-3xl">
        <div className="flex space-x-2">
          <Input
            placeholder="Search courses..."
            className="h-10"
          />
          <Button size="lg">Search</Button>
        </div>
      </div>
    </div>
  
    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link key={course.id} to={`/course/${course.id}`}>
          <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <course.icon className="h-8 w-8" />
                <span className="text-sm text-muted-foreground">
                  {course.level}
                </span>
              </div>
              <CardTitle className="mt-4">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">
                  {course.category}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
  
  );
}