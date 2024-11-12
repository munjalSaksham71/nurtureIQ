import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { coursesData } from "@/data/courses";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CourseProgress } from "@/lib/types";

export default function CoursePage() {
  const { courseId } = useParams();
  const course = coursesData[courseId as keyof typeof coursesData];
  const [progress, setProgress] = useLocalStorage<CourseProgress>(
    `course-progress-${courseId}`,
    {}
  );
  const [currentLesson, setCurrentLesson] = useState(() => {
    return course?.sections[0]?.lessons[0];
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  const handleLessonComplete = () => {
    setProgress((prev) => ({
      ...prev,
      [currentLesson.id]: true,
    }));
  };

  const handleLessonSelect = (lesson: typeof currentLesson) => {
    setCurrentLesson(lesson);
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[300px_1fr]">
      <aside className="border-r">
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-sm">
                <span>Course Progress</span>
                <span>{progressPercentage}% COMPLETE</span>
              </div>
              <Progress value={progressPercentage} />
            </div>
            <Accordion
              type="single"
              collapsible
              className="mt-6 w-full bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              {course.sections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="text-base font-semibold text-gray-800 bg-gray-100 py-3 px-4 hover:bg-gray-200 rounded-t-lg">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="bg-white px-4 py-3">
                    <div className="flex flex-col space-y-2">
                      {section.lessons.map((lesson) => (
                        <Button
                          key={lesson.id}
                          className={`flex w-full items-center justify-start space-x-2 px-3 py-2 rounded-lg ${
                            currentLesson?.id === lesson.id
                              ? "bg-green-200"
                              : "bg-gray-100"
                          } hover:bg-gray-200`}
                          onClick={() => handleLessonSelect(lesson)}
                        >
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              progress[lesson.id]
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-sm truncate ${
                              currentLesson?.id === lesson.id
                                ? "text-green-700 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {lesson.title}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </aside>
      <main className="overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl">
          {currentLesson && (
            <>
              <h1 className="mb-8 text-4xl font-bold">{currentLesson.title}</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {currentLesson.description}
              </p>
              <VideoPlayer
                videoUrl={currentLesson.videoUrl}
                onComplete={handleLessonComplete}
                isCompleted={!!progress[currentLesson.id]}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
