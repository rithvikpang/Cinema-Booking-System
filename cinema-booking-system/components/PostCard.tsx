import Image from 'next/image'
import React from 'react'

const PostCard = () => {
  return (
    <div className="three-col">
        <div className="card">
            <Image
            src="/Wonka.jpg"
            width={240}
            height={300}
            alt="wonka poster"/>
            <h3 className="description">Wonka</h3>
            <dl>
                <dt className="description">1 HR 56 MIN | PG</dt>
                <dt className="description">Released Dec 15, 2023</dt>
            </dl>
            <div className="home-buttons block">
                <div className="h-button block">
                    <a href="https://youtu.be/otNh9bTjXWg?si=7G3LAmZPcKdILPNv">
                        <button type="submit">Watch Trailer</button>
                    </a>
                </div>
                <div className="h-button block">
                    <button type="submit" >Book Movie</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard