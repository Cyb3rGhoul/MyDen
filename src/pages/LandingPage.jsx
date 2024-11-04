import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, Grid, IconButton, useTheme } from '@mui/material';
import { RocketLaunch, Speed, Assistant, Lock, GitHub, Twitter, LinkedIn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(200, 172, 214, 0.2)',
          },
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: '50%',
            p: 2,
            mb: 2,
          }}
        >
          <Icon sx={{ fontSize: 40, color: 'secondary.main' }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontFamily: '"Orbitron", sans-serif',
            color: 'secondary.main',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'secondary.main', opacity: 0.8 }}>
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'primary.main',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated background elements */}
      <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#C8ACD6',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {/* Hero section */}
        <Box
          sx={{
            pt: 15,
            pb: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontFamily: '"Orbitron", sans-serif',
                color: 'secondary.main',
                mb: 3,
                textShadow: '0 0 20px rgba(200, 172, 214, 0.3)',
              }}
            >
              Welcome to MyDen
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'secondary.main',
                opacity: 0.9,
                maxWidth: '800px',
                px: 2,
              }}
            >
              Your personal AI-powered workspace that adapts to your needs.
              Stay organized, focused, and productive with a suite of intelligent tools.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/sign-in/*')}
              startIcon={<RocketLaunch />}
              sx={{
                bgcolor: 'secondary.main',
                color: 'primary.main',
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                fontFamily: '"Orbitron", sans-serif',
                '&:hover': {
                  bgcolor: 'secondary.light',
                },
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>

        {/* Features section */}
        <Box sx={{ py: 8, px: 2 }}>
          <Grid
            container
            spacing={4}
            sx={{
              mt: 4,
              maxWidth: 'lg',
              mx: 'auto',
            }}
          >
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Speed}
                title="Lightning Fast"
                description="Access your workspace instantly with optimized performance and responsive design."
                delay={0.9}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Assistant}
                title="AI Assistant"
                description="Powered by Gemini AI to help you stay productive and organized."
                delay={1.1}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Lock}
                title="Secure & Private"
                description="Your data is encrypted and protected with state-of-the-art security."
                delay={1.3}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 1,
          mt: 'auto',
          bgcolor: 'background.paper',
          borderTop: '1px solid rgba(200, 172, 214, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ py: 4 }}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  color: 'secondary.main',
                  mb: 2,
                }}
              >
                MyDen
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'secondary.main', opacity: 0.8 }}
              >
                Your AI-powered personal workspace
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  color: 'secondary.main',
                  mb: 2,
                }}
              >
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {['Home', 'Features', 'About', 'Contact'].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      color: 'secondary.main',
                      opacity: 0.8,
                      cursor: 'pointer',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  color: 'secondary.main',
                  mb: 2,
                }}
              >
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton size="small" sx={{ color: 'secondary.main' }}>
                  <GitHub />
                </IconButton>
                <IconButton size="small" sx={{ color: 'secondary.main' }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: 'secondary.main' }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              py: 2,
              borderTop: '1px solid rgba(200, 172, 214, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'secondary.main', opacity: 0.8 }}
            >
              © {new Date().getFullYear()} MyDen. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;