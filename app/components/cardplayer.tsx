import React from 'react';

import Text from './text';
import Webpage from './webpage';

export interface Props {
  cover?: string;
  track: string;
  artist: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
}
export function CardPlayer({
  cover,
  track,
  artist,
  progress,
  duration,
  isPlaying,
}: Props): React.ReactElement {
  const trackName = `${track ?? ''} `.trim();
  const artistNames = artist || 'Nothing playing...';
  return (
    <Webpage width={128} height={128}>
      <style>
        {`
            .paused {
              animation-play-state: paused !important;
              background: #e1e4e8;
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
              opacity: 0;
            }

            .wrapper-progress {
                position: relative;
                width: 100%;
                max-width: 115px;
                height: 6px;
                margin: 1px;

            }



            .wrapper-progress:hover  > .progress-bar > #progress {
                background-color: #1DB954;
            }

            .wrapper-progress #wrapper-ball {
                width: 100%;
                animation: roll ${duration}ms linear forwards;
                animation-delay: -${progress}ms;
            }
            .wrapper-progress #wrapper-ball #ball {
              background-color: white;
              box-shadow: 0 1px 3px rgba(0,0,0,1), 0 3px 10px rgba(0,0,0,0.5);
              position: absolute;
              height: 5px;
              width: 6px;
              overflow: visible !important;
              top: -6px;
              left: -1px;
              border-radius: 50%;

            }

            .wrapper-progress .progress-bar {
                position: inherit;
                width: inherit;
                max-width: inherit;
                height: 4px;
                margin: inherit;
                border: 1px solid #484848;
                border-radius: 16px;
                overflow: hidden;
                opacity: 1;
                padding: 1px;
                background-color: #707070;
              }

            #progress {
              position: absolute;
              top: -2px;
              left: 0;
              width: 100%;
              height: 10px;
              transform-origin: left center;
              background-color: #FAF9F6;
              animation: progress ${duration}ms linear;
              animation-delay: -${progress}ms;
            }

            .wrapper-progress,
            #track,
            #artist,
            #cover {
              opacity: 0;
              animation: appear 300ms ease-out forwards;
            }

            #track {
              animation-delay: 400ms;
            }
            #artist {
              animation-delay: 500ms;
            }

            .progress-bar {
              animation-delay: 550ms;
              margin-top: 4px;
            }


            .cover {
              animation-name: cover-appear;
              animation-delay: 300ms;
              background-image: linear-gradient(180deg, gray, black);
              box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05);
            }

            .cover img{
                box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05);
                width: 100%;

                object-fit: cover;
                opacity: 0.75;

            }

            .cover .top-left {
                position: absolute;
                top: 20px;
                left: 30px;
                text-shadow: 0px 0px 3px black;
            }

            .cover .bottom-left {
                position: absolute;
                bottom: 10px;
                left: 2px;
                text-shadow: 0px 0px 3px black;
            }

            @keyframes cover-appear {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes appear {
              from {
                opacity: 0;
                transform: translateX(-8px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes progress {
              from {
                transform: scaleX(0%)
              }
              to {
                transform: scaleX(100%)
              }
            }
            @keyframes roll {
                from {
                  transform: translateX(0%);
                }
                to {
                  transform: translateX(100%);
                }
            }

        `}
      </style>

      <div className="cover">
        <img src={cover ?? ''} alt="Cover" width="128" height="128" />
        <div className="bottom-left">
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              marginTop: -4,
              marginLeft: 4,
            }}
          >
            <Text id="track" weight="bold" color="white" size="tiny">
              {trackName.length < 17
                ? trackName
                : trackName.substring(0, 14).trim().concat('...')}
            </Text>
            <Text id="artist" color="white" size="tiny">
              {artistNames.length < 20
                ? artistNames
                : artistNames.substring(0, 14).trim().concat('...')}
            </Text>

            {track && (
              <div className="wrapper-progress">
                <div className="progress-bar">
                  <div id="progress" className={!isPlaying ? 'paused' : ''} />
                </div>
                <div id="wrapper-ball" className={!isPlaying ? 'paused' : ''}>
                  <div id="ball" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Webpage>
  );
}
