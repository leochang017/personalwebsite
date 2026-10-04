export interface ArchiveItem {
  n: number;
  org: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  /** one-paragraph summary, shown first when expanded */
  desc: string;
  details: string[];
  highlights: string[];
  tags: string[];
  logo?: string;
  photo?: { src: string; alt: string; credit?: string };
  links?: { label: string; href: string }[];
}

export interface LightboxItem {
  src: string;
  caption: string;
}
