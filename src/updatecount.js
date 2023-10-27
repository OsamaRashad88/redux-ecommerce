//increase or decrease count
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import toast from "react-hot-toast";
const notify=()=>toast.success('item deleted')
export const updatecartcount=createAsyncThunk('cartcount/updatecartcount',async function ({id,count}){

    let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
     count:count
    },{headers:{
         token:localStorage.getItem('acesstoken')    }})
         return data
 })
 export const deleteitem=createAsyncThunk('cartcount/deleteitem',async function (id){

    let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{
         token:localStorage.getItem('acesstoken')    }})
         notify()
         return data
 })
