import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
let cartItems = [];

function CartItem({ itemId, name, imgSrc, price}) {
  const [qty, setQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    cartItems = cart;
    calcTotal();
    setItemPrice(parseInt(qty) * parseFloat(price));
  }, [qty]);


  function calcTotal() {
    let totalPrice = 0;

    if (cartItems.length > 0) {
        cartItems.map(item => {
            totalPrice += (parseInt(item.qty) * parseFloat(item.price));
        });
    }
    dispatch({
        type: actionType.SET_TOTAL,
        total: totalPrice,
    });
  }
  
  
  const updateQty = (action, id) => {
    let quantity = qty;
    if (action === "add") {
        quantity = qty + 1;
      setQty(quantity);
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        cartItems.pop(id);
        calcTotal();
      } else {
        quantity = qty - 1;
        setQty(quantity);
      }
    }
    if (cartItems.length > 0) {
        cartItems.map(item => {
            if (item.id === id) {
                item.qty = quantity;
            }
        });
    }
    dispatch({
        type: actionType.SET_CART,
        cart: cartItems,
    }, {
    });

    
  };



  return (
    <div className="cartItem" id={itemId}>
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <div className="itemQuantity">
          <span>x {qty}</span>
          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQty("remove", itemId)}
            />
            <AddRounded
              className="itemAdd"
              onClick={() => updateQty("add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="dolorSign">$</span>{" "}
        <span className="itemPriceValue">{itemPrice}</span>
      </p>
    </div>
  );
}

export default CartItem;