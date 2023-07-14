import React from 'react';

import { NotFound } from '../components/404';
import { Card } from '../components/card';
import { topArtist } from '../lib/spotify';
import { checkRedirect, getCover, getParams, getResponse } from '../lib/util';

async function getArtist(index: number, open: boolean) {
  const item = await topArtist({ index: index - 1 });
  checkRedirect(item, open);

  const artist = item ? item.name : '';
  const cover =
    item && item.images
      ? item.images[0]?.url
      : 'https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18';
  const coverImg = await getCover(cover);

  if (item) {
    return <Card index={index} cover={coverImg} artist={artist} />;
  }
  return <NotFound index={index} cover={coverImg} type="Artist" />;
}

export async function GET(request) {
  const { i = 1, open = false } = getParams(request);
  const component = await getArtist(Number(i), Boolean(open));
  return getResponse(component);
}
