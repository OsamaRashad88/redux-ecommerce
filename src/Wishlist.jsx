import React, { useEffect } from 'react'
import { getwishlist, wishlistsl } from './Getwishlist'
import { useDispatch, useSelector } from 'react-redux'
import Grid from "@mui/material/Unstable_Grid2"; 
import { Avatar, Box, Button, Typography } from '@mui/material';
import { addtocart } from './cartslice';
import { deleteitemwishlist } from './addwishlist';
export default function Wishlist() {
    const Wishlist = useSelector((state) => state.wishlist.wishlist);

    const dispatch=useDispatch()
    async function wishlisthandler(){
        await dispatch(getwishlist())
    }
    useEffect(()=>{
        wishlisthandler()
    },[])
  return<>
  <Typography variant='h5'>Your wishlist</Typography>
{Wishlist.length>=1?<>
{Wishlist.map((item)=><Grid container spacing={3} sx={{alignItems:'center',width:'90%',margin:'auto',textAlign:{xs:'center',md:'left'}}} >
<Grid xs={6} md={2}>
<Box sx={{  width: {md:'100%'} }}>
                  <img src={item.imageCover} width={'100%'} alt={item.title} />
  </Box>
</Grid>
<Grid xs={6} md={2}>
    <Box x={{  width: {xs:'50%',md:'100%'} }}><Typography variant='h6'>{item.slug}</Typography>
</Box>
</Grid>
<Grid md={2}>
<Typography variant='h6'>price:{item.price} EGP</Typography>
</Grid>
<Grid md={2}>
<Button variant='contained' color='secondary' onClick={()=>dispatch(addtocart(item.id))}>  add to cart</Button>

</Grid>
<Grid md={2}>
<Button variant='contained' color='secondary' onClick={()=>dispatch(deleteitemwishlist(item.id)).then(()=>wishlisthandler())}>  remove from wishlist</Button>

</Grid>
</Grid>)}

</>:'no items in your wish list'}
</>

}
