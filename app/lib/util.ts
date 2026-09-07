import { redirect } from 'next/navigation';
import React from 'react';
const ReactDOMServer = require('react-dom/server');

const TRANSPARENT_URL =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png';

export function getParams(request: Request) {
  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams);
}

export function checkRedirect(item, open: boolean = false) {
  if (!open) {
    return;
  }
  if (item && item.external_urls) {
    redirect(item.external_urls.spotify || 'https://github.com/kevinfjiang');
  }
  redirect('https://github.com/kevinfjiang');
}

export async function getCover(cover: string) {
  const coverURL = cover ?? TRANSPARENT_URL;
  const buff = await (
    await fetch(coverURL, { next: { revalidate: 120 } })
  ).arrayBuffer();
  const coverImg = `data:image/jpeg;base64,${Buffer.from(buff).toString('base64')}`;
  return coverImg;
}

export async function getResponse(component: React.ReactElement) {
  const svg = ReactDOMServer.renderToStaticMarkup(component);

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
