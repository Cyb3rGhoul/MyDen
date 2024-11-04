// src/components/auth/SignInButton.jsx
import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react";
import { Button } from "@mui/material";

export const SignInButton = () => (
  <ClerkSignInButton mode="modal">
    <Button
      variant="contained"
      sx={{
        background: 'linear-gradient(45deg, #2E236C 30%, #433D8B 90%)',
        color: '#C8ACD6',
        fontFamily: 'Orbitron, sans-serif',
        textTransform: 'none',
        fontSize: '1.1rem',
        padding: '10px 30px',
        '&:hover': {
          background: 'linear-gradient(45deg, #433D8B 30%, #2E236C 90%)',
        },
      }}
    >
      Sign In
    </Button>
  </ClerkSignInButton>
);
