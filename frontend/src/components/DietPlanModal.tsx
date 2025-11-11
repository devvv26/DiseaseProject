import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DietPlan {
  [meal: string]: string[];
}

interface DietPlanModalProps {
  open: boolean;
  onClose: () => void;
  dietPlan: DietPlan | null;
  isLoading: boolean;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '50%' },
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const DietPlanModal = ({ open, onClose, dietPlan, isLoading }: DietPlanModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" component="h2" gutterBottom>
          Your Personalized Diet Plan
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Generating your plan...</Typography>
          </Box>
        ) : dietPlan ? (
          <Box sx={{ mt: 2 }}>
            {Object.entries(dietPlan).map(([meal, items], index) => (
              <Box key={meal}>
                <Typography variant="h6" sx={{ mt: 2, textTransform: 'capitalize' }}>{meal}</Typography>
                <List dense>
                  {items.map((item, itemIndex) => (
                    <ListItem key={itemIndex}>
                      <ListItemText primary={`- ${item}`} />
                    </ListItem>
                  ))}
                </List>
                {index < Object.keys(dietPlan).length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>
            Sorry, we couldn't generate a diet plan at this moment. Please try again later.
          </Typography>
        )}
      </Paper>
    </Modal>
  );
};

export default DietPlanModal;
