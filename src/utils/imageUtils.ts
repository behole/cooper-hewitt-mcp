import fetch from 'node-fetch';

export async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}