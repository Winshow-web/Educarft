export interface Program {
  title: string;
  duration: string;
  language: string;
  tuition: string;
  intake: string;
}

export interface University {
  name: string;
  logo: string;
  description: string;
  location: string;
  country: string;
  programs: Program[];
  features: string[];
}