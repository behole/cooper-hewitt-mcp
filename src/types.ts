export interface CooperHewittImage {
  b: {
    url: string;
    width: number;
    height: number;
  };
}

export interface CooperHewittObject {
  id: string;
  title_raw?: string;  // The API sometimes uses title_raw instead of title
  title?: string;      // Fallback to this if title_raw is not available
  images?: {
    b?: {
      url: string;
      width: number;
      height: number;
    };
  }[];
  department?: string;
  medium?: string;
  date?: string;
  description?: string;
  creditline?: string;
  dimensions?: string;
}