import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CooperHewittObject } from '../types';

interface ObjectsGridProps {
  objects: CooperHewittObject[];
}

const ObjectsGrid: React.FC<ObjectsGridProps> = ({ objects }) => {
  if (!objects || objects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {objects.map((object) => {
        const imageUrl = object.images?.[0]?.b?.url;
        
        return (
          <Card key={object.id} className="w-full">
            <CardContent className="p-4">
              {imageUrl && (
                <div className="relative w-full h-48 mb-2">
                  <img
                    src={imageUrl}
                    alt={object.title || 'Object image'}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium truncate">{object.title}</h3>
              {object.date && (
                <p className="text-sm text-gray-500">{object.date}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ObjectsGrid;