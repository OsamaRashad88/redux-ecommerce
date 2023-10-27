/// add /delete wishlist
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const notify = () => toast.success('item added to wishlist .');
export const addwishlist=createAsyncThunk('wishlist/getwishlist', async function (productId){
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
    headers:{
        token:localStorage.getItem('acesstoken')

    }
})
    
notify()
return data
})

export const deleteitemwishlist=createAsyncThunk('deletewishlist/getwishlist', async function (productId){
    let {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:{
            token:localStorage.getItem('acesstoken')
    
        }
    })
        
    return data
    console.log(data)
    })
    