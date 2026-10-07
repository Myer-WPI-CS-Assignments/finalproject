import Box from "@mui/material/Box";
import CycloneOutlinedIcon from "@mui/icons-material/CycloneOutlined";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export default function TopBar() {

  return (
      <Box
          sx={{
            boxSizing: "border-box",
            width: "100%",
            height: "100px",
            px: "56px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFF8F6",
            borderBottom: "1px solid #E9E3E3",
          }}
      >
        {/*left side - wpi guesser logo*/}
        <Box sx={{flex: 1, display: "flex", alignItems: "center", gap: 1.5}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
            <CycloneOutlinedIcon fontSize="large" sx={{color: "#FF4D4D"}} />
            <Box>
              <Typography sx={{fontFamily: "Inter", fontSize: "22px", color: 'black', lineHeight: 1.1}}>
                WPI GUESSER
              </Typography>

              <Typography sx={{fontFamily: '"Roboto Mono Variable", monospace', fontSize: "11px", fontWeight: 600, color: "#FF4D4D"}}>
                Guess the campus
              </Typography>
            </Box>
          </Box>
        </Box>

        {/*center - buttons*/}
        <Box sx={{display: "flex", flexDirection: 'row', alignItems: 'center', gap: "8px"}}>
          <Button sx={{fontFamily: "Inter", fontSize: "14px", fontWeight: 500, color: "#72706F", px: "20px", py: "12px", borderRadius: "12px", border: "1px solid #E9E5E3", textTransform: "none"}}>
            Lobby
          </Button>

          <Button sx={{fontFamily: "Inter", fontSize: "14px", fontWeight: 500, color: "#72706F", px: "20px", py:"12px", borderRadius: "12px", border: "1px solid #E9E5E3", textTransform: "none"}}>
            Leaderboard
          </Button>
        </Box>

        {/*right - profile*/}
        <Box sx={{flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1.5}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "10px"}}>
            <AccountCircleOutlinedIcon fontSize="large" sx={{color: "#FF4D4D"}} />
            <Box>
              <Typography sx={{fontFamily: "Inter", fontSize: "13px", fontWeight: 'bold', color: 'black', lineHeight: 1.1}}>
                Thomas Gilbert
              </Typography>

              <Typography sx={{fontFamily: "Inter", fontSize: "11px", color: "#72706F"}}>
                Campus Explorer
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
  )
}