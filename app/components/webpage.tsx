import React from 'react';

export interface Props {
  width: number;
  height: number;
}

export default function Webpage({
  width,
  height,
  children,
}: React.PropsWithChildren<Props>): React.ReactElement {
  return (
    <svg
      fill="none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width={width} height={height}>
        <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}>
          <style>{`
              * {
                margin: 0;
                box-sizing: border-box;
              }
              :root {
                color: rgb(36, 41, 46);
                background: transparent;
              }

              @media (prefers-color-scheme: dark) {
                :root {
                  color: rgb(201, 209, 217);
                  background: rgb(00, 17, 00);
                }

                p {
                  color: inherit !important;
                }
              }
            `}</style>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}
