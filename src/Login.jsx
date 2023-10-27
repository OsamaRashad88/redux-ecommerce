import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logincontext } from "./Logincontext";
import { getCart } from "./getCartSlice";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";


export default function Login() {

  const {saviingtoken,logged}=useContext(logincontext)
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [errormessage, seterrormessage] = useState(null);
   function login(values) {
    setisloading(true);
    seterrormessage(null);
    let { data } =  axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).then(res=>{
        if (res.data.message==='success'){
          saviingtoken(res.data.token)
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
        seterrormessage(err.response.data.message);
        setisloading(false)
      });
   
  }
 
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required"),
      password: Yup.string().required("Password is required"),

  });
  let user = {
    email: "",
    password: "",
  };

  let Formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: (values) => {
      login(values)
     
    }

    
});
  return (
    <div className="w-50 mx-auto">
      <h3>Login</h3>
      {errormessage ? (
        <div className="alert alert-danger">{errormessage}</div>
      ) : (
        ""
      )}
      <form onSubmit={Formik.handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              type="email"
              className="form-control"
              id="email"
              placeholder="enter your email"
              name="email"
              value={Formik.values.email}
            />
            {Formik.errors.email && Formik.touched.email ? (
              <div className="alert alert-danger text-center">
                {Formik.errors.email}
              </div>
            ) : (
              "  "
            )}
          </div>

          <div>
            <label htmlFor="password" type="password" className="form-label">
              password
            </label>
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className="form-control"
              id="password"
              type="password"
              placeholder="enterpassord"
              value={Formik.values.password}
              name="password"
            />
            {Formik.errors.password && Formik.touched.password ? (
              <div className="alert alert-danger text-center">
                {Formik.errors.password}

              </div>
            ) : (
              "  "
            )}
          </div>

          {isloading ? 
            <box >
<CircularProgress color="success" />



            </box>
           : (
            <button
              disabled={!(Formik.isValid && Formik.dirty)}
              type="submit"
              className="btn btn-outline-primary"
            >
              submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
