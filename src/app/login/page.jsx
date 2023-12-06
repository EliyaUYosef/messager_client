"use client";
import { AppContext } from "@/app/AppContext";
import React, {useContext, useEffect} from "react";
import styles from "../page.module.css";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Button,
  Link,
  InputLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter();

    const { globalData, setGlobalData,authToken, setAuthToken } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "abra@example.com",
    password: "Aa123456",
  });
  useEffect(() => {
    const authorizationToken = localStorage.getItem("Authorization");
    if (authToken !== '') {
        router.push('/')
    }
    else if (authorizationToken !== null) {
        // setAuthToken(authorizationToken)
        // getUserProfile(authorizationToken)
        // router.push('/')
    }
    },[])
  const [errorData, setErrorData] = useState({});
  const inputSX = { m: 1, p: 1, width: "80%" };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const getUserProfile = async (token) => {
    try {
        console.log("REQUEST", formData);
        const response = await fetch(
          `https://messager-api-c2cd41880be6.herokuapp.com/api/auth/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: "application/json",
              Authorization: authToken
            }
          }
        );
  
        const data = await response.json();
        if (data.message === "User profile data.") {
            console.log("RESPONSE", data);
          setGlobalData({...globalData, user : data.data})
          router.push('/');
          return "0";
        }
        return "0";
      } catch (error) {
        console.error("Error during login:", error);
        return "0";
      }
  }
  const loginUser = async (formData) => {
    try {
      console.log("REQUEST", formData);
      const response = await fetch(
        `https://messager-api-c2cd41880be6.herokuapp.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.message === "Login successful.") {
          console.log("RESPONSE", data);
        setGlobalData({...globalData, user : data.data.user})
        const token = `Bearer ${data.data.access_token}`;
        setAuthToken(token);
        localStorage.setItem("Authorization", token);
        router.push('/');
        return "0";
      }

      setErrorData(data.errors);
      return "0";
    } catch (error) {
      console.error("Error during login:", error);
      return "0";
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    loginUser(formData);
  };

  return (
    <div className={styles.container}>
      <h3 style={{ fontWeight: "500" }}>Login Form</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <InputLabel sx={{ m: 1 }}>Email</InputLabel>
        <TextField
          size="small"
          sx={inputSX}
          name="email"
          variant="outlined"
          onChange={handleInputChange}
        />
        <FormHelperText sx={{ color: "red", ml: 5 }}>
          {errorData?.email}
        </FormHelperText>

        <InputLabel sx={{ m: 1 }}>Password</InputLabel>
        <TextField
          type={showPassword ? "text" : "password"} // label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
          sx={inputSX}
          name="password"
          variant="outlined"
          onChange={handleInputChange}
        />
        <FormHelperText sx={{ color: "red" }}>
          {errorData?.password}
        </FormHelperText>
        <br />
        <Button
          type="submit"
          sx={{ m: 1, p: 1 }}
          name="submit"
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
