
// fetching the user cart
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
export const getCart=createAsyncThunk('cartDetails/getcart',async function (){
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{
            token:localStorage.getItem('acesstoken')
        }
    })
    return data.data
})
export const cartDetails=createSlice({
    name:'cartDetails',
    initialState:{
        cart:[],
        loading:true,
        error:''
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(getCart.fulfilled,(state,action)=>{
                state.cart=action.payload
            })
                
    }
})
export let getcartSlice=cartDetails.reducer