import Box from "@mui/material/Box";
import {Stack, TextField, Typography} from "@mui/material";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from "@mui/material/Button";


export default function LoginCard() {

  return(
      <Box
          sx={{
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "492px",
            height: "auto",
            borderRadius: "28px",
            backgroundColor: "background.paper",
            color: "text.primary",
            boxShadow: 3,
            overflow: "hidden",
            padding: "40px",
          }}
      >
        <Stack sx={{gap: "24px"}}>
          <Stack sx={{gap: "8px"}}>
            {/*welcome back goat tag*/}
            <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1}}>
              <ExploreOutlinedIcon sx={{fontFamily: '"Roboto Mono Variable", monospace', fontSize: "14px", fontWeight: "bold", color: "#FF4D4D"}}/>
              <Typography sx={{fontFamily: '"Roboto Mono Variable", monospace', fontSize: "10px", fontWeight: "bold", color: "#FF4D4D"}}>
                WELCOME BACK GOAT!
              </Typography>
            </Box>

            {/*ready to explore campus tag*/}
            <Typography sx={{fontFamily: "Inter", fontSize: "32px", fontWeight: "bold", color: "#0B0B0B"}}>
              Ready to explore campus?
            </Typography>

            <Typography sx={{fontFamily: "Inter", fontSize: "14px", fontWeight: "400px", color: "#6B6B6B"}}>
              Sign in to continue your campus streak and pick up where you left off.
            </Typography>
          </Stack>

          {/*text boxes*/}
          <Stack sx={{gap: "16px"}}>
            {/*username section*/}
            <Box sx={{gap: "7px"}}>
              <Typography sx={{fontFamily: "Inter", fontSize: "12px", fontWeight: "bold"}}>
                Username
              </Typography>
              <TextField fullWidth id="username-text" variant="outlined" />
            </Box>

            {/*password section*/}
            <Box sx={{gap: "7px"}}>
              <Typography sx={{fontFamily: "Inter", fontSize: "12px", fontWeight: "bold"}}>
                Password
              </Typography>
              <TextField fullWidth id="password-text" variant="outlined" />
            </Box>
          </Stack>

          {/*log in button*/}
          <Button
              fullWidth
              variant="contained"
              sx={{
                height: "56px",
                borderRadius: "14px",
                backgroundColor: "#FF4D4D",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: "normal",
                textTransform: "none",
              }}>
            Log in & explore campus
          </Button>

          {/*create new account tag*/}
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'row'}}>
            <Typography sx={{fontFamily: "Inter", fontSize: "14px"}}>
              New to WPI Geo?
            </Typography>
            <Button variant="text" sx={{fontFamily: "Inter", fontSize: "14px", color: "#FF4D4D", '&:hover': { backgroundColor: 'transparent' }}}>Create an account</Button>
          </Box>
        </Stack>
      </Box>
  )
}