import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getwishlist=createAsyncThunk('wishlist/getwishlist', async function (){
let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
    headers:{
        token:localStorage.getItem('acesstoken')

    }
})
    
console.log(data.data)
return data.data
})

export const wishlist=createSlice({
    name:'wishlist',
    initialState:{wishlist:[]},
    reducers:{},
extraReducers:(builder)=>{
builder.addCase(getwishlist.fulfilled,(state,action)=>{
    state.wishlist=action.payload
})
}
})
export const getwishlistSlice=wishlist.reducer