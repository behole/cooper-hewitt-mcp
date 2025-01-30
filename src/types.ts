export interface CooperHewittImage {
  b: {
    url: string;
    width: number;
    height: number;
  };
  base64Data?: string;  // Added for storing base64 image data
}

export interface CooperHewittObject {
  id: string;
  title_raw?: string;  // The API sometimes uses title_raw instead of title
  title?: string;      // Fallback to this if title_raw is not available
  images?: CooperHewittImage[];
  department?: string;
  medium?: string;
  date?: string;
  description?: string;
  creditline?: string;
  dimensions?: string;
}