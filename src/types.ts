export interface CooperHewittImage {
  b: {
    url: string;
    width: number;
    height: number;
  };
}

export interface CooperHewittObject {
  id: string;
  title: string;
  images?: CooperHewittImage[];
  department?: string;
  medium?: string;
  date?: string;
  description?: string;
}