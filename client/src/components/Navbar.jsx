import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout Succefully !");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.primary}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}>
      <Typography variant="h1" color={"primary"} fontWeight="bold">
        Chat Intelligence
      </Typography>
      {loggedIn ? (
        <NavLink to="/login" onClick={handleLogout} p={1}>
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Signup
          </NavLink>
          <NavLink to="/login" p={1}>
            Signin
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
