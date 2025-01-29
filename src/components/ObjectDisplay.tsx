import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CooperHewittObject } from '../types';

interface ObjectDisplayProps {
  object: CooperHewittObject;
}

const ObjectDisplay: React.FC<ObjectDisplayProps> = ({ object }) => {
  if (!object) return null;

  const imageUrl = object.images?.[0]?.b?.url;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{object.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {imageUrl && (
            <div className="relative w-full h-96">
              <img 
                src={imageUrl} 
                alt={object.title || 'Object image'}
                className="object-contain w-full h-full"
              />
            </div>
          )}
          <div className="space-y-2">
            {object.department && (
              <p className="text-sm">Department: {object.department}</p>
            )}
            {object.medium && (
              <p className="text-sm">Medium: {object.medium}</p>
            )}
            {object.date && (
              <p className="text-sm">Date: {object.date}</p>
            )}
            {object.description && (
              <p className="text-sm mt-4">{object.description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObjectDisplay;