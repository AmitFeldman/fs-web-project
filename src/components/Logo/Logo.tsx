import React, {FC, useEffect, useRef} from 'react';

const LOGO_TEXT = 'bloog';

const Logo: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas?.current?.getContext('2d');

    if (context) {
      context.font = '28px Ubuntu';
      context.fillStyle = 'white';
      context.fillText(LOGO_TEXT, 0, 26);
    }
  }, [canvas]);

  return (
    <canvas className="hvr-shrink" ref={canvas} height="32px" width="72px" />
  );
};

export default Logo;
