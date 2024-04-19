// components/TrailerPopup.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from "next/link"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trailer: string;
  title: string;
  rating: string;
  cast: string;
  director: string;
  descr: string;
}

const TrailerPopup: React.FC<Props> = ({ isOpen, onClose, trailer, title, rating, cast, director, descr }) => {

  if (!isOpen) return null;

  const embedUrl = trailer.includes("watch?v=") 
    ? trailer.replace(/watch\?v=/, "embed/") 
    : trailer;

  return (
    <div>
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
            }}
            onClick={onClose}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '70%',
                height: '50%',
                borderRadius: '15px'
                
            }} onClick={e => e.stopPropagation()} // Prevent click inside the modal from closing it
            >

                <iframe
                src={embedUrl}
                frameBorder="0"
                title="Movie Trailer"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    width: '60%',
                    height: '100%',
                    padding: '40px'
                }}
                ></iframe>

                <div>
                    <h2 className="descr">{title}</h2>
                    <h4 className="descr">Rated {rating}</h4>
                    <h4 className="descr">Genre: </h4>
                    <h4 className="descr">Director: {director}</h4>
                    <h4 className="descr">Cast: {cast}</h4>
                    <h4 className="descr">Sypnosis: {descr}</h4>

                    <div className="select-time">
                        <Link className="left-button block" href="/select-show-time">
                            <button className="left-button block" type="submit">Click to Book Movie</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
};

export default TrailerPopup;
