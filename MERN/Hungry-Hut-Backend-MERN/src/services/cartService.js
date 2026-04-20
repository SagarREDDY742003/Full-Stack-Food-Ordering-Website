import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import Food from "../models/food.model.js";

export const createCart = async(user) =>{
    const cart = new Cart({customer:user});
    const createdCart = await cart.save();
    return createCart;
};

export const findCartByUserId = async(userId) => {
    let cart = await Cart.findOne({customer:userId}).populate([
        {
            path:"items",
            populate:{
                path:"food",
                populate:{
                    path:"restaurant",
                    select:"_id"
                },
            },
        }
    ]);
    if(!cart) throw new Error("Cart not found");

    let cartItems = await CartItem.find({cart:cart._id}).populate("food");
    cart.total = calculateCartTotals(cart);
    return cart;
};

export const addItemToCart = async(req,userId) => {
    const cart = await Cart.findOne({customer:userId});
    const food = await Food.findById(req.menuItemId);
    const item = await CartItem.findOne({
        cart: cart._id,
        food:food._id,
    })

    if(!item){
        item = new CartItem({
            food:food._id,
            cart:cart._id,
            quantity:1,
            ingredients:req.ingredients,
            totalPrice:food.price,
        });
        await item.save();
        cart.items.push(item);
    }
    else{
        item.quantity+=1;
        item.totalPrice=item.quantity*food.price;
    }
    await cart.save();
    return item;
};

export const updateCartItemQuantity = async(cartItemId,quantity) => {
    const cartItem = await CartItem.findById(cartItemId).populate([
        {path:"food",populate:{path:"restaurant",select:"_id"}},
    ]);
    if(!cartItem) throw new Error('cart item not found');
    cartItem.quantity=quantity;
    cartItem.totalPrice=quantity*cartItem.food.price;
    await cartItem.save();
    return cartItem;
};

export const removeCartItemFromCart = async(cartItemId,user) => {
    const cart = await Cart.findOne({customer:user._id});
    if(!cart) throw new Error('cart not found');
    cart.items = cart.items.filter((item)=>!item.equals(cartItemId));
    await cart.save();
    return cart;
};

export const clearCart = async(id) => {
    const cart = await Cart.findOne({customer:id});
    if(!cart) throw new Error('cart not found');
    cart.items=[];
    await cart.save();
    return cart;
}

export const calculateCartTotals = async(cart) => {
    try {
        let total=0;
        for(let item of cart.items){
            total += item.food.price*item.quantity;
        }
        return total;
    } catch (error) {
        throw new Error(error.message)
    }
}