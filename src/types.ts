export interface CarouselItem {
  file: string;
  socialProof: string;
  line1: string;
  line2: string;
  line3: string;
  type: 'video' | 'image';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
