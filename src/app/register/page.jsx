'use client';
import '@fontsource/inter';

import * as NextLink from 'next/link';
import styles from '../page.module.css';
import * as React from 'react';
import { useState } from 'react';
import { Button, Link, InputLabel, TextField, FormHelperText, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/joy/Box';
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    terms: true,
  });
  const [errorData, setErrorData] = useState({
    name: '',
    email: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, value,checked,  name === 'terms')
    if ( name === 'terms')
      setFormData({
        ...formData,
        [name]: checked,
      });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.terms) {
      setErrorData({...errorData,terms:'please fill the terms of use'});
      return '0';
    }
    if (formData.password_confirmation !== formData.password) {
      setErrorData({ ...errorData, confirm: 'please check again the confirm password field' });
      return '0';
    }
    console.log("REQUEST",formData)
    fetch('https://messager-api-c2cd41880be6.herokuapp.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json().then((data) => {
            console.log("RESPONSE",data)
          if (data.message === "User created successfully.") {
            router.push('/login');
            return '0';
          }
          setErrorData(data.errors);
          return '0';
        });
      })
      .catch((error) => {
        console.error(error);
        return '0';
      });
  };
  const inputSX = { m: 1, p: 1, width: '80%' };
  return (
    <div className={styles.container}>
      <h3 style={{ fontWeight: '500',color:"#212121" }}>Register Form</h3>
      <br />
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 0 },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <InputLabel sx={{ m: 1 }}>Name</InputLabel>
        <TextField autoFocus size='small' sx={inputSX} name='name' variant='outlined' onChange={handleInputChange} />
        <FormHelperText sx={{ color: 'red' }}>{errorData?.name}</FormHelperText>

        <InputLabel sx={{ m: 1 }}>Email</InputLabel>
        <TextField size='small' sx={inputSX} name='email' variant='outlined' onChange={handleInputChange} />
        <FormHelperText sx={{ color: 'red', ml: 5 }}>{errorData?.email}</FormHelperText>

        <InputLabel sx={{ m: 1 }}>Password</InputLabel>
        <TextField
          type={showPassword ? 'text' : 'password'} // label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size='small'
          sx={inputSX}
          name='password'
          variant='outlined'
          onChange={handleInputChange}
        />
        <FormHelperText sx={{ color: 'red' }}>{errorData?.password}</FormHelperText>

        <InputLabel sx={{ m: 1 }}>Confirm Password</InputLabel>
        <TextField
          type={showPassword ? 'text' : 'password'} // label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size='small'
          sx={inputSX}
          name='password_confirmation'
          variant='outlined'
          onChange={handleInputChange}
        />
        <FormHelperText sx={{ color: 'red' }}>{errorData?.password_confirmation}</FormHelperText>
        <br />
        <InputLabel sx={{ mt: 1 }}>Terms Of Use</InputLabel>
        <Checkbox color='primary' variant='solid'  sx={{ mb: 1 }} name="terms" onChange={(e) => handleInputChange(e)}/>
        <FormHelperText sx={{ color: 'red' }}>{errorData?.terms}</FormHelperText>

        <br />
        <Button type='submit' sx={{ p: 1, mt: 1 }} name='submit' variant='contained'>
          Do It !
        </Button>
        <br />
        <Link component={NextLink} href='/login'>
          already registered ?
        </Link>
      </Box>
    </div>
  );
}
