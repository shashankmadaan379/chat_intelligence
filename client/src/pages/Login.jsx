import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Link,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", true);
      toast.success("Login Succesful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}>
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSignin}>
        <Typography varient="h3">Signin</Typography>
        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="Login"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
          onSubmit={handleSignin}>
          Login
        </Button>
        <Typography mt={2}>
          Don't have an account ? <Link href="/register">Please Register</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
