import React from 'react';
import { Card, CardContent } from '../components/ui/card.js';
import { CooperHewittObject } from '../types.js';

interface ObjectsGridProps {
  objects: CooperHewittObject[];
}

const ObjectsGrid: React.FC<ObjectsGridProps> = ({ objects }) => {
  if (!objects || objects.length === 0) return null;

  // Only take first 6 objects to ensure they fit in viewport
  const displayObjects = objects.slice(0, 6);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-screen">
      {displayObjects.map((object) => {
        // Try title_raw first, then fall back to title
        const title = object.title_raw || object.title || 'Untitled';
        const imageUrl = object.images?.[0]?.b?.url;
        
        return (
          <Card key={object.id} className="flex flex-col h-64">
            <CardContent className="flex-1 p-4">
              {imageUrl && (
                <div className="relative h-40 mb-2">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              )}
              <h3 className="text-sm font-medium truncate">{title}</h3>
              {object.date && (
                <p className="text-xs text-gray-500">{object.date}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ObjectsGrid;