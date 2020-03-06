import React, {FC, useEffect, useRef} from 'react';

const Logo: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas?.current?.getContext('2d');

    if (context) {
      context.font = '28px Ubuntu';
      context.fillStyle = 'white';
      context.fillText('bloog', 0, 26);
    }
  }, [canvas]);

  return <canvas ref={canvas} height="32px" width="73px" />;
};

export default Logo;
