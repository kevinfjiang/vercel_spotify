import React from 'react';

import { Track } from '../components/track';
import { topTrack } from '../lib/spotify';
import { checkRedirect, getCover, getParams, getResponse } from '../lib/util';

async function getTrack(index: number, open: boolean) {
  const item = await topTrack({ index: index - 1 });
  checkRedirect(item, open);

  const { name: track } = item;
  const artist = (item.artists || []).map(({ name }) => name).join(', ');

  const { images = [] } = item.album || {};
  const cover = images[images.length - 1]?.url;
  const coverImg = await getCover(cover);

  return <Track index={index} cover={coverImg} artist={artist} track={track ?? ''} />;
}

export async function GET(request) {
  const { i = 1, open = false } = getParams(request);
  const component = await getTrack(Number(i), Boolean(open));
  return getResponse(component);
}
