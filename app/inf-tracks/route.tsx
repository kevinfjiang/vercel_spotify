import React from 'react';

import { NotFound } from '../components/404';
import { Card } from '../components/card';
import { topTrack } from '../lib/spotify';
import { checkRedirect, getCover, getParams, getResponse } from '../lib/util';

async function getTrack(index: number, open: boolean) {
  const item = await topTrack({ index: index - 1 });
  checkRedirect(item, open);

  let cover = 'https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18';
  if (Object.keys(item).length !== 0) {
    const { images = [] } = item.album || {};
    cover = images[0]?.url;
  }
  const coverImg = await getCover(cover);

  if (Object.keys(item).length !== 0) {
    const { name: track } = item;
    const artist = (item.artists || []).map(({ name }) => name).join(', ');
    return <Card index={index} cover={coverImg} artist={artist} track={track} />;
  }
  return <NotFound index={index} cover={coverImg} type="Track" />;
}

export async function GET(request: Request) {
  const { i = 1, open = false } = getParams(request);
  const component = await getTrack(Number(i), Boolean(open));
  return getResponse(component);
}
