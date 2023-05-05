import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  
    products:[],
    total:0,
    quantity:1
}

const cartSlice = createSlice({
    name :"cart",
    initialState,

    reducers:{

        addToCart:(state,action)=>{
            const itemInCart = state.products.find((item)=>item.id===action.payload.id);

            if(itemInCart){
                itemInCart.quantity++
            }else{
                state.products.push({...action.payload,quantity:state.quantity})
            }
        },removeFromCart:(state,action)=>{
          
            state.products = state.products.filter((item)=>item.id!==action.payload)

             state.total -= action.payload.price

        },
        increaseQnty:(state,action)=>{
            
            const itemInCart = state.products.find((item)=>item.id===action.payload);

            if(itemInCart){
                itemInCart.quantity++;
                state.total +=  itemInCart.price
            }

        },
        decreaseQnty:(state,action)=>{
            const itemInCart = state.products.find((item)=>item.id===action.payload);
            

            if(itemInCart){
              if(itemInCart.quantity > 1){
                itemInCart.quantity--;

                state.total -= itemInCart.price
              }
            }
            // console.log(action.payload);
        }
    }
})

export const {addToCart,removeFromCart,increaseQnty,decreaseQnty} = cartSlice.actions
export default  cartSlice.reducer