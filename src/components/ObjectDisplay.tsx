import React from 'react';
import { Card, CardContent } from './ui/card.js';
import { CooperHewittObject } from '../types.js';

interface ObjectDisplayProps {
  object: CooperHewittObject;
}

const ObjectDisplay: React.FC<ObjectDisplayProps> = ({ object }) => {
  const title = object.title_raw || object.title || 'Untitled';
  const imageData = object.images?.[0];

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            {object.date && (
              <p className="text-gray-500">{object.date}</p>
            )}
          </div>

          {imageData?.base64Data && (
            <div className="relative aspect-video">
              <img
                src={imageData.base64Data}
                alt={title}
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
          )}

          {object.department && (
            <div>
              <h3 className="font-semibold">Department</h3>
              <p>{object.department}</p>
            </div>
          )}

          {object.medium && (
            <div>
              <h3 className="font-semibold">Medium</h3>
              <p>{object.medium}</p>
            </div>
          )}

          {object.description && (
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{object.description}</p>
            </div>
          )}

          {object.creditline && (
            <div>
              <h3 className="font-semibold">Credit</h3>
              <p>{object.creditline}</p>
            </div>
          )}
          
          {object.dimensions && (
            <div>
              <h3 className="font-semibold">Dimensions</h3>
              <p>{object.dimensions}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObjectDisplay;