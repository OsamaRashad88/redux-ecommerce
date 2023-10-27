import Button from "@mui/material/Button";
import { Alert, Avatar, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; 
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./cartslice";
import { addwishlist } from "./addwishlist";


export default function Detailedproduct() {
const[productimg,setproductimg]=useState('')
  const[ showmsg,setshowmsg]=useState(false)
const [msg,setmsg]=useState('item added succesfully')
  const dispatch = useDispatch();
  const { productid } = useParams();

  const [productDetails, setProductDetails] = useState({});
  async function getproductdetails() {
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${productid}`
      );
      console.log(data.data);
      setProductDetails(data.data);
      
    } catch (error) {
      
      console.error("Error fetching product details: ", error);
    }
  }

  useEffect(() => {
    getproductdetails();
  }, [productid]);

  useEffect(() => {
    if (productDetails.images && productDetails.images.length > 0) {
      setproductimg(productDetails.imageCover)
    }
  }, [productDetails])
  return productDetails.images ?  (
    <>
      <Grid container spacing={5} sx={{ width: "90%", margin: "auto" }}>
        <Grid md={1}>{productDetails.images && <Box sx={{display:'flex',flexDirection:'column',width:'100%',overflowY:'auto'}}> 
{productDetails.images.map((image)=><Avatar srcSet={image} variant="square" sx={{width:4/4,height:'20%',"&:hover":{border:'1px solid yellow'}}} onClick={()=>setproductimg(image)} />)}
        </Box>}</Grid>
        <Grid xs={12} md={2}>
          <Avatar
          srcSet={productimg}
            sx={{ width: 4 / 4 ,height:400}}
            variant="square"
            alt="Product"
          />
        </Grid>
        <Grid md={6} sx={{textAlign:{xs:'center',md:'left'}}}>
          <Typography variant="h3" sx={{ marginBottom: "20px" }}>
            {productDetails.slug}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            {productDetails.category.name}
          </Typography>
          <Typography sx={{ marginBottom: "20px" }}>
            {productDetails.description}
          </Typography>
          <Typography sx={{ marginBottom: "20px" }}>
            quantity: {productDetails.quantity}
          </Typography>
          <Typography sx={{ marginBottom: "20px" }}>
          Rating:{productDetails.ratingsAverage}
          </Typography>
          <Typography >
          price:{productDetails.price} EGP
          </Typography>
       
  
        </Grid>
        <Grid md={3}>
        <Box sx={{width:'100%',backgroundColor:'lightblue',p:5}}>
        <Typography variant="h6" >
          price:{productDetails.price} EGP
          </Typography>
          <Typography variant="h6" >
         in stock
          </Typography>
          <Typography variant="h6" >
arrives in three days     
     </Typography>
     <Button
            variant="contained"
            color="success"
            sx={{mb:2,display:{sm:'block'}}}
            onClick={()=>{
              dispatch (addtocart(productDetails._id) )

            }}
  
            
          >
           add to cart
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={()=>{
              dispatch (addwishlist(productDetails._id))

            }}
  
            
          >
           add to wishlist
          </Button>
          <Typography variant="h6" >
sold by:Happycart
          </Typography>
        </Box>
        
        </Grid>
      </Grid>
    </>
  ) : (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
