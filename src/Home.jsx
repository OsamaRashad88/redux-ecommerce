import axios, { Axios } from "axios";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; 
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { logincontext } from "./Logincontext";
import { addtocart } from "./cartslice";
import { useDispatch } from "react-redux";
import { getCart, getcartSlice } from "./getCartSlice";
import { addwishlist } from "./addwishlist";

export default function Home() {

  const dispatch=useDispatch()
  const{logged}=useContext(logincontext)
  const resultsnumber = 40;
  const [pagesize, setpagesize] = useState(10);
  const [pagesnumber, setpagesnumber] = useState(resultsnumber / pagesize);
  const [startindex, setstartindex] = useState(0);
  const [endindex, setendindex] = useState(pagesize);
  const [products, setproducts] = useState([]);
  const [slicedproducts, setslicedproducts] = useState([]);
  const [isloading, setisloading] = useState(true);
  async function getproducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setproducts(data.data);
    setisloading(false);

    setslicedproducts(products.slice(startindex, endindex));
  }
  useEffect(() => {
    getproducts();
  }, [isloading]);


  return (
    <>
      <Grid container spacing={3} sx={{ width: '85%', margin: "auto" }}>
        {isloading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: 4 / 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          slicedproducts.map((product) => {
            return (
              <Grid md={3} className='product'>
                <Link to={`/${product._id}`}>
                  <Box
                    key={product._id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p:2,
                      '&:hover':{border:'1px solid #E4D00A	'}
                    }}
                  >
                    <Box className="cart" sx={{width:4/4}}>
                      <img srcSet={product.imageCover} height={'400px'} width={'100%'}/>
                    <Box sx={{width:4/4,px:2,bgcolor:'#1871CA'}}>
                    <Typography variant="h6" sx={{ textAlign: "center" ,color:'white'}}>
                        {product.title.split(' ').splice(0,2).join(' ')}
                      </Typography>

                    </Box>
                      <Box sx={{display:'flex',justifyContent:'space-between',p:2}}>
                      <Typography variant="h6">{product.price}</Typography>
                      <Typography variant="h6">{product.ratingsAverage}</Typography>

                      </Box>
                    </Box>
                  </Box>
                </Link>
                <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 3 / 4,display:'none',margin:'auto'}}
                        className="addbtn"
                        onClick={()=>{
                          dispatch (addtocart(product._id))
                        }
                        }
                      >
                        add to cart
                      </Button>
                      <Button onClick={()=>dispatch(addwishlist(product._id))}>            <FavoriteBorderIcon></FavoriteBorderIcon>
</Button>
              </Grid>
            );
          })
        )}
      </Grid>
      <Pagination
        count={pagesnumber}
        color="secondary"
        sx={{
          width: 2 / 4,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(e) => {
          setisloading(true);
          setstartindex((e.target.innerText - 1) * pagesize);
          setendindex(e.target.innerText * pagesize);
          if (e.target.innerText === pagesnumber) {
            setendindex(-1);
            setisloading(false);
          }
        }}
      />
    </>
  );
}
