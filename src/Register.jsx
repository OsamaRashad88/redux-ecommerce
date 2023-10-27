import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ValidationSchema } from "./validationschema";
import { Button, Typography } from "@mui/material";
import shop from './shop.jpg'
export default function Register() {
  const [registerError, setRegisterError] = useState("");
  let navigate = useNavigate();
  async function register(values) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        console.log("Registration successful");
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response);

      if (
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        err.response.data.errors.msg
      ) {
        setRegisterError(err.response.data.errors.msg);


      } else {

        setRegisterError("An error occurred during registration.");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <>
      <Box             onSubmit={formik.handleSubmit}
 component={"form"} novalidate autoComplete="off" sx={{display:'flex',justifyContent:'space-between'}}>
        <Box             sx={{width:'50%',mx:3}}>

          <TextField
            label="name"
            type={"text"}
            defaultValue={formik.values.name}
            id="name"
            name="name"
            size="medium"
            sx={{display:'block',mb:2}}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></TextField>
          {formik.errors.name && formik.touched.name ? <Typography>{formik.errors.name} </Typography> : ''} 

                <TextField
            label="password"
            type="password"
            defaultValue={formik.values.password}   
           id="password"
            name="password"
            size="medium"

            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{display:'block',mb:2}}
          ></TextField>
          {formik.errors.password && formik.touched.password? <Typography>{formik.errors.password}</Typography> : ''} 

          <TextField             sx={{display:'block',mb:2}}
 label='confirm password' defaultValue={formik.values.rePassword} name="rePassword" id='rePassword' type="password"
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 ></TextField>
 {formik.errors.rePassword && formik.touched.rePassword? <Typography>{formik.errors.rePassword}</Typography> : ''} 

 <TextField     
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  size="medium"

 sx={{display:'block',mb:2}}
 name='phone' id='phone' defaultValue={formik.values.phone} type="phone" label='phone'></TextField>     
 {formik.errors.phone && formik.touched.phone? <Typography>{formik.errors.phone}</Typography> : ''} 

          <TextField   size="medium"
         sx={{display:'block',mb:2}}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
 name='email' id='email' type='email' defaultValue={formik.values.email} label='email'></TextField>
 {formik.errors.email && formik.touched.email? <Typography>{formik.errors.email}</Typography> : ''} 
        <Button variant="contained"  color="success" type="submit"> submit</Button>
          {registerError!='' &&<Typography >{registerError}</Typography>}

        </Box>
        <Box sx={{width:'50%'}}>
<img srcSet={shop} variant='square' width={'70%'} height={'50%'} />
        </Box>
      </Box>
    </>
  );
}
