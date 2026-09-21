import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const testImage: string = "https://fastly.picsum.photos/id/951/1920/1080.jpg?hmac=OvbR6E44oP84dbN1wYY-OTU671-KoVcwp94Xyn1F0cI";
const level: number = 1;

export default function Game() {
    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed" }}>
                <img src={testImage} style={{ width: "100vw", height: "100vh", objectFit: "cover" }} />
            </div>
            
            <Box 
                component="section" 
                sx={{ 
                    p: 1, 
                    borderRadius: "15px", 
                    position: "absolute", 
                    zIndex: 1, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                Level {level}
            </Box>
        </div>
    );
}
