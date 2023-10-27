//add to cart  
import { Alert, Snackbar, Stack } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useState } from 'react'
import toast from "react-hot-toast";
const notify = () => toast.success('item added to cart .');
const initialState = {
  cartcount: [],
}



export const addtocart=createAsyncThunk('cart/addtocart',async function (x){
 

  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
  {productId:x},
  {headers:{
    token:localStorage.getItem('acesstoken')
  }}
  )
notify()
  return data
})
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
   
  },
  extraReducers: (builder) => {
    builder.addCase(addtocart.fulfilled, (state, action) => {
 notify()
      state.cart=action.payload

    })
  }
})


export const {} = cartSlice.actions

export  let cartslice= cartSlice.reducer