// src/components/auth/AuthWrapper.jsx
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Box } from "@mui/material";

const clerkAppearance = {
  baseTheme: {
    colors: {
      primary: "#433D8B",
      primaryLight: "#C8ACD6",
      background: "#17153B",
    },
  },
  variables: {
    borderRadius: "8px",
    fontFamily: "Exo 2, sans-serif",
  },
  elements: {
    card: "bg-[#2E236C]",
    headerTitle: "text-[#C8ACD6] font-orbitron",
    headerSubtitle: "text-[#C8ACD6]",
    socialButtonsBlockButton: "border-[#433D8B]",
    formButtonPrimary: "bg-[#433D8B] hover:bg-[#2E236C]",
    formFieldInput: "bg-[#17153B] text-[#C8ACD6]",
    formFieldLabel: "text-[#C8ACD6]",
    footerActionLink: "text-[#433D8B] hover:text-[#C8ACD6]",
  },
};

export const SignInWrapper = () => (
  <Box sx={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    bgcolor: '#17153B' 
  }}>
    <SignIn appearance={clerkAppearance} />
  </Box>
);

export const SignUpWrapper = () => (
  <Box sx={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    bgcolor: '#17153B' 
  }}>
    <SignUp appearance={clerkAppearance} />
  </Box>
);