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
        </div>
    </div>
  )
}

export default PostCard