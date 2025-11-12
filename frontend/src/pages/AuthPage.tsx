import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Tabs, Tab, Paper, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

// --- Login Form Component ---
const LoginForm = ({ onSwitchTab }: { onSwitchTab: () => void }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error: any) {
      setError("root", { type: "manual", message: error.message || "Login failed." });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        autoComplete="username"
        autoFocus
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message as string}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />
      {errors.root && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {errors.root.message as string}. Please try again or{' '}
          <Link component="button" type="button" onClick={onSwitchTab}>
            create an account
          </Link>
          .
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

// --- Register Form Component ---
const RegisterForm = () => {
  const { register: signup } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
  const password = watch('password');

  const onSubmit = async (data: any) => {
    try {
      await signup(data);
      // The success toast from AuthContext will guide the user to log in.
    } catch (error: any) {
      setError("root", { type: "manual", message: error.message || "Registration failed." });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message as string}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "The passwords do not match" })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message as string}
      />
      {errors.root && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {errors.root.message as string}.
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

// --- Main Auth Page ---
const AuthPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          // The 'py' property has been removed from here.
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8, // This top margin can be kept or adjusted.
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Paper elevation={3} sx={{ width: '100%', p: 2 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="auth tabs" variant="fullWidth">
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <Box sx={{ p: 3, width: '100%' }}>
            {tabIndex === 0 && <LoginForm onSwitchTab={() => setTabIndex(1)} />}
            {tabIndex === 1 && <RegisterForm />}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;