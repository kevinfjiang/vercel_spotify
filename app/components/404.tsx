import React from 'react';

import { Card } from './card';

export interface Props {
  index?: number;
  cover?: string;
  type?: string;
}

export function NotFound({ index, cover, type }: Props): React.ReactElement {
  return (
    <Card
      index={index}
      cover={cover}
      track="404s & Heartbreak"
      artist={`${type} Not Found...`}
    />
  );
}
