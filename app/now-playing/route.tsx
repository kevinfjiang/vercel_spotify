import React from 'react';

import { Player } from '../components/nowplaying';
import { playing } from '../lib/spotify';
import { checkRedirect, getCover, getParams, getResponse } from '../lib/util';

async function getPlaying(open: boolean) {
  const {
    item = {} as any,
    is_playing: isPlaying = false,
    progress_ms: progress = 0,
  } = await playing();

  checkRedirect(item, open);

  const { duration_ms: duration, name: track, artists = [], album = {} } = item;
  const artistNames = artists.map(({ name = '' }) => name).join(', ');

  const { images = [] } = album;
  const cover = images[0]?.url;
  const coverImg = await getCover(cover);

  return (
    <Player
      cover={coverImg}
      artist={artistNames}
      track={track}
      isPlaying={isPlaying}
      progress={progress ?? 0}
      duration={duration}
    />
  );
}

export async function GET(request) {
  const { open = false } = getParams(request);
  const component = await getPlaying(Boolean(open));
  return getResponse(component);
}
