export interface Verse {
  id: string;
  text: string;
  source?: string; // e.g., "Surah Al-Fatiha: 1"
  note?: string;   // Optional context or instruction
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  verses: Verse[];
  icon?: string; 
}

export type ViewState = 'grid' | 'list';