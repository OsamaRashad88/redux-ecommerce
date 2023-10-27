import axios, { Axios } from "axios";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { logincontext } from "./Logincontext";

export default function Categories() {
  const {logged}=useContext(logincontext)

  const [categories, setcategories] = useState([]);
  async function getcategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data);
    setcategories(data.data);
  }
  useEffect(() => {
    console.log(logged)
    getcategories();
  }, []);
  return (
    <>

      <Grid container spacing={2} sx={{ width: 3 / 4, margin: "auto" ,}}>
        {categories.map((category) => {
          return (
            <Grid md={3} sm={6} xs={12}>
              <Box sx={{width:'100%',textAlign:'center'}}> 
                <Box sx={{width:'100%',textAlign:'center'}}>
                  <Avatar variant="square" srcSet={category.image} sx={{width:4/4,height:400}} />
                </Box>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {category.slug}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
