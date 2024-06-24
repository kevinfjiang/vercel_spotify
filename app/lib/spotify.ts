import { stringify } from 'querystring';
import { URLSearchParams } from 'url';

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const Authorization = `Basic ${basic}`;
const BASE_URL = `https://api.spotify.com/v1`;
const LIMIT = 50;

async function getAuthorizationToken() {
  const url = new URL('https://accounts.spotify.com/api/token');
  const body = stringify({ grant_type: 'refresh_token', refresh_token: refreshToken });
  const response = await fetch(url, {
    method: 'POST',
    cache: 'force-cache',
    next: { revalidate: 3600 },
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  }).then((r) => r.json());

  return `Bearer ${response.access_token}`;
}

const NOW_PLAYING_ENDPOINT = `/me/player/currently-playing`;
export async function playing(): Promise<Partial<SpotifyApi.CurrentlyPlayingResponse>> {
  const token = await getAuthorizationToken();
  const response = await fetch(`${BASE_URL}${NOW_PLAYING_ENDPOINT}`, {
    headers: { Authorization: token },
    next: { revalidate: 5 },
  });

  const data = (response.status === 200) ? (await response.json()) : {};
  return data;
}

const TOP_TRACKS_ENDPOINT = `/me/top/tracks`;
export async function topTrack({
  index,
  timeRange = 'short_term',
}: {
  index: number;
  timeRange?: 'long_term' | 'medium_term' | 'short_term';
}): Promise<Partial<SpotifyApi.TrackObjectFull>> {
  const token = await getAuthorizationToken();
  const params = new URLSearchParams();
  const quo = (~~index/LIMIT) * LIMIT;
  const rem = index % LIMIT;

  params.set('limit', `${LIMIT}`);
  params.set('offset', `${quo}`);
  params.set('time_range', `${timeRange}`);

  const response = await fetch(`${BASE_URL}${TOP_TRACKS_ENDPOINT}?${params}`, {
    headers: { Authorization: token },
    next: { revalidate: 120 },
  });

  const data =
    response.status === 200
      ? ((await response.json()) as SpotifyApi.UsersTopTracksResponse).items.at(rem) : {};
  return data || {};
}

const TOP_ARTISTS_ENDPOINT = `/me/top/artists`;
export async function topArtist({
  index,
  timeRange = 'short_term',
}: {
  index: number;
  timeRange?: 'long_term' | 'medium_term' | 'short_term';
}): Promise<Partial<SpotifyApi.ArtistObjectFull>> {
  const token = await getAuthorizationToken();
  const params = new URLSearchParams();
  const quo = (~~index/LIMIT) * LIMIT;
  const rem = index % LIMIT;

  params.set('limit', `${LIMIT}`);
  params.set('offset', `${quo}`);
  params.set('time_range', `${timeRange}`);

  const response = await fetch(`${BASE_URL}${TOP_ARTISTS_ENDPOINT}?${params}`, {
    headers: { Authorization: token },
    next: { revalidate: 120 },
  });

  const data =
    response.status === 200
      ? ((await response.json()) as SpotifyApi.UsersTopArtistsResponse).items.at(rem) : {};
  return data || {};
}
