export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  videoUrl: string;
  description: string;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  sections: Section[];
}

export interface CourseProgress {
  [lessonId: string]: boolean;
}