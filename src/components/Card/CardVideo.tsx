import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export interface CardVideoProps {
  source: string;
}

export const CardVideo = ({ source }: CardVideoProps) => {
  const [initialRender, setInitialRender] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard for client-only ReactPlayer
    setInitialRender(true);
  }, []);

  // Render placeholder on first paint to avoid hydration mismatch
  if (!initialRender) {
    return (
      <div className="cu-card__video">
        <span className="sr-only">Loading video</span>
      </div>
    );
  }

  return (
    <div className="cu-card__video">
      <ReactPlayer src={source} width="100%" height="100%" controls />
    </div>
  );
};

CardVideo.displayName = 'Card.Video';
