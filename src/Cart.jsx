import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './getCartSlice';
import { deleteitem, updatecartcount } from './updatecount';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
export default function Cart() {
  const cart = useSelector((state) => state.cartdetails.cart);
  const dispatch = useDispatch();

  async function trygetcart() {
    await dispatch(getCart());
  }

  const increasecartbutton = async (product) => {
    await dispatch(updatecartcount({ id: product.product._id, count: product.count + 1 }));
  };

  const decreasecartbutton = async (product) => {
    await dispatch(updatecartcount({ id: product.product._id, count: product.count - 1 }));
  };

  const handledelte = async (productId) => {
    await dispatch(deleteitem(productId));
  };

  useEffect(() => {
    trygetcart();
  }, []);

  return<>
            <Typography variant="h6"> cart details</Typography>

  {cart?.products?  <Grid container spacing={3} sx={{ width: '90%', margin: 'auto' }}>
<Grid container md={9}>
{cart.products.map((product)=>
<>
<Grid md={1}>
<Box sx={{  width: '100%' }}>
                  <img src={product.product.imageCover} width={'100%'} alt={product.product.title} />
  </Box>
</Grid>
<Grid md={11}>
<Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center',width:'100%',}}>
                  <Box >
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>Product: {product.product.title.split(' ').splice(0,2).join(' ')}</Typography>
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>Price: {product.price}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button  color='primary' onClick={() => decreasecartbutton(product).then(() => trygetcart())}>-</Button>
                    <Typography variant='h5'>{product.count}</Typography>
                    <Button sx={{fontSize:'1.5rem'}}  color='primary' onClick={() => increasecartbutton(product).then(() => trygetcart())}>+</Button>
                    <Button  variant='contained' sx={{marginLeft: '9rem',fontSize:'1.5rem'}}  color="secondary" onClick={() => handledelte(product.product._id).then(() => trygetcart())}>Remove</Button>
                  </Box>
                </Box>

</Grid></>)}

</Grid>
<Grid md={3}>
<Box sx={{backgroundColor:'lightblue'}}>
          <Typography variant="h6">Your cart details</Typography>
          <Typography variant="h6">Cart total price is {cart.totalCartPrice} EGP</Typography>
          <Typography variant="h6">Number of Products {cart.products.length}</Typography>
          <Typography variant="h6">Address:Alexandria,Egypt</Typography>

        </Box>

</Grid>

  </Grid>
  :<CircularProgress></CircularProgress> }
 
  </>
}
