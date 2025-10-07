import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          HealthCheck
        </Typography>
        
        {location.pathname === '/assessment' ? (
          <Button component={RouterLink} to="/" color="primary">
            Home
          </Button>
        ) : (
          <Button component={RouterLink} to="/assessment" color="primary">
            Take Assessment
          </Button>
        )}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;