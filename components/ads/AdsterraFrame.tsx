'use client';

import React from 'react';

interface AdsterraFrameProps {
  adKey: string;
  scriptUrl: string;
  width: number;
  height: number;
  className?: string;
}

export function AdsterraFrame({
  adKey,
  scriptUrl,
  width,
  height,
  className = '',
}: AdsterraFrameProps) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key': '${adKey}',
            'format': 'iframe',
            'height': ${height},
            'width': ${width},
            'params': {}
          };
        </script>
        <script type="text/javascript" src="${scriptUrl}"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex items-center justify-center overflow-hidden max-w-full ${className}`}>
      <iframe
        srcDoc={htmlContent}
        width={width}
        height={height}
        title={`adsterra-${adKey}`}
        loading="lazy"
        scrolling="no"
        style={{
          border: 'none',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
