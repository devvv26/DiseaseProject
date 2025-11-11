import React from 'react';
import { Popover, Grid, Typography, Link } from '@mui/material';
import { menuItems } from './megaMenuItems';

interface MegaMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEnter: () => void;
  onNavigate: (path: string) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ open, anchorEl, onClose, onEnter, onNavigate }) => {
  return (
    <Popover
      id="mega-menu-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      disableRestoreFocus
      PaperProps={{
        onMouseEnter: onEnter,
        onMouseLeave: onClose,
        sx: {
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '600px',
          marginTop: '8px',
          borderRadius: '16px',
          boxShadow: '0px 10px 25px rgba(0,0,0,0.1)',
          p: 3,
        },
      }}
      sx={{
        pointerEvents: 'none',
      }}
    >
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid xs={6} key={item.title}>
            <Link
              component="button"
              onClick={() => onNavigate(item.path)}
              underline="none"
              sx={{
                display: 'block',
                p: 1,
                width: '100%',
                textAlign: 'left',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderRadius: '8px',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
            >
              <Typography variant="body1">{item.title}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Popover>
  );
};

export default MegaMenu;