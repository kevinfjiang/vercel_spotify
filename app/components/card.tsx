import React from 'react';

import Text from './text';
import Webpage from './webpage';

export interface Props {
  index?: number;
  cover?: string;
  track?: string;
  artist?: string;
}

export function Card({ index, cover, track, artist }: Props): React.ReactElement {
  const trackName = `${track ?? ''} `.trim();
  console.log(trackName);
  const artistNames = artist || 'Nothing playing...';

  return (
    <Webpage width={128} height={128}>
      <style>
        {`
            @media (prefers-color-scheme: dark) {
              color: #FFF;
            }

            img:not([src]) {
              content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
              background: #FFF;
              border: 1px solid #e1e4e8;
            }

            img {
              border-radius: 3px;
            }

            p {
              display: block;
            }

            .cover {
                position: relative;
                background: black;

            }

            .cover img{
                box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05);
                width: 100%;
                object-fit: cover;
                opacity: 0.85;
            }

            .cover .top-left {
              position: absolute;
              top: 4px;
              left: 6px;
              text-shadow: 0px 0px 3px black;
            }

            .cover .bottom-left {
                position: absolute;
                bottom: 6px;
                left: 6px;
                text-shadow: 0px 0px 3px black;
            }



        `}
      </style>

      <div className="cover">
        <img src={cover ?? ''} width="128" height="128" />
        <div className="top-left">
          <Text
            style={{ width: '16px', marginRight: '16px' }}
            size="large"
            weight="bold"
            color="white"
          >
            #{index}
          </Text>
        </div>
        <div className="bottom-left">
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              margin: 'auto',
            }}
          >
            {track && (
              <Text id="track" weight="bold" color="white" size="tiny">
                {' '}
                {trackName.length < 19
                  ? trackName
                  : trackName.substring(0, 16).trim().concat('...')}{' '}
              </Text>
            )}
            <Text
              id="artist"
              weight={track ? 'undefined' : 'bold'}
              color="white"
              size={track ? 'tiny' : 'small'}
            >
              {artistNames.length < 19
                ? artistNames
                : artistNames.substring(0, 16).trim().concat('...')}
            </Text>
          </div>
        </div>
      </div>
    </Webpage>
  );
}
