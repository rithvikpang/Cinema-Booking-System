// components/TrailerPopup.tsx
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const TrailerPopup: React.FC<Props> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        width: '70%',
        height: '70%',
      }} onClick={e => e.stopPropagation()} // Prevent click inside the modal from closing it
      >
        <iframe
          src={videoUrl}
          frameBorder="0"
          title="Movie Trailer"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerPopup;
