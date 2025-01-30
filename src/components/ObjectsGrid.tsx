import React from 'react';
import { Card, CardContent } from './ui/card.js';
import { CooperHewittObject } from '../types.js';

interface ObjectsGridProps {
  objects: CooperHewittObject[];
}

const ObjectsGrid: React.FC<ObjectsGridProps> = ({ objects }) => {
  if (!objects || objects.length === 0) return null;

  // Only take first 6 objects to ensure they fit in viewport
  const displayObjects = objects.slice(0, 6);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayObjects.map((object) => {
        const title = object.title_raw || object.title || 'Untitled';
        const imageData = object.images?.[0];
        
        return (
          <Card key={object.id} className="flex flex-col">
            <CardContent className="p-4">
              <div className="relative aspect-square mb-2 bg-gray-100 rounded overflow-hidden">
                {imageData?.base64Data ? (
                  <img
                    src={imageData.base64Data}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
                {object.date && (
                  <p className="text-xs text-gray-500">{object.date}</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ObjectsGrid;