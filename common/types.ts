export interface Quiz {
  id: string;
  title: string;
  shortDescription: string;
  gradient: string;
  questions: Question[];
}

export interface Answer {
  answer: string;
  isCorrect: boolean;
}

export interface Question {
  title: string;
  video_url?: string;
  answers: Answer[],
  image_url?: string;
}
