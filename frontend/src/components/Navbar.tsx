import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Diabetes Risk Assessment
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}> {/* You'll create a /login route later */}
            Login
          </Button>
          {/* You can add more buttons here, e.g., Register, Dashboard */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;