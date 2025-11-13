export interface Video {
  id: string;
  title: string;
  description?: string;
  duration: number; // in seconds
  order: number;
  videoUrl?: string;
  transcript?: string;
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'artifact' | 'open-question';
  order: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  videos: Video[];
  checkpoints?: Checkpoint[];
  estimatedDuration: number; // in minutes
}

export interface CourseStructure {
  sections: Section[];
  totalVideos: number;
  totalDuration: number; // in hours
}

export interface UserProgress {
  userId: string;
  completedVideos: string[];
  completedCheckpoints: string[];
  currentSection?: string;
  currentVideo?: string;
  totalProgress: number; // percentage
}

export interface IntakeResponse {
  id: string;
  userId: string;
  responses: {
    project?: string;
    experience?: string;
    goal?: string;
    industry?: string;
    timeCommitment?: string;
    [key: string]: any;
  };
  generatedPath?: PersonalizedPath;
  createdAt: Date;
}

export interface PersonalizedPath {
  sections: string[]; // Section IDs in recommended order
  estimatedWeeks: number;
  checkpoints: string[];
  artifacts: string[];
  customRecommendations?: string;
}

export type Tier = 'basic' | 'personalized' | 'premium';

export interface PricingTier {
  id: Tier;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}
