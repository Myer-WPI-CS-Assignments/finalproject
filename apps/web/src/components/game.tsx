import React from 'react';

const testImage: string = "https://fastly.picsum.photos/id/951/1920/1080.jpg?hmac=OvbR6E44oP84dbN1wYY-OTU671-KoVcwp94Xyn1F0cI";

export default function Game() {
    return (
        <div style={{ position: "fixed", inset: 0,  display: "grid", placeItems: "center" }}>
          <img src={testImage} style={{ width: "100%", height: "100%"}} />
        </div>
    );
}
