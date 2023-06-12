import { AddRounded, Favorite, StarRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
import { Items } from "./Data";
let cartData = [];

function ItemCard({ itemId, imgSrc, name, price, ratings }) {
  const [currentValue, setCurrentValue] = useState(Math.floor(ratings));
  const [isFavourite, setFavourite] = useState(false);
  const [{cart}, dispatch] = useStateValue();

  const handleAddToCart = (id) => {
    let cartItem = Items.find(val => (val.id === id));
    cartData = cart;
    console.log(id);
    if (cartItem) {
        cartItem.qty = 1;
        if (cartData === null) {
            cartData = [];
            cartData.push(cartItem);
        } else if (cartData.length >= 0 && (cartData.findIndex((val) => (val.id === id)) <= -1)) {
            console.log("called");
            cartData.push(cartItem);
        }
        dispatch({
            type: actionType.SET_CART,
            cart: cartData,
        });
    }
  }

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  return (
    <div className="itemCard" id={itemId}>
      <div
        className={`isFavourite ${isFavourite ? "active" : ""}`}
        onClick={() => setFavourite(!isFavourite)}
      >
        <Favorite />
      </div>

      <div className="imgBox">
        <img src={imgSrc} alt="" className="itemImg" />
      </div>

      <div className="itemContent">
        <h3 className="itemName">{name}</h3>
        <div className="bottom">
          <div className="ratings">
            {Array.apply(null, { length: 5 }).map((e, i) => (
              <i
                key={i}
                className={`rating ${currentValue > i ? "orange" : "gray"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <h3 className="price">
              <span>$ </span>
              {price}
            </h3>
          </div>
          <i
            className="addToCart"
            // onClick={addToCart(itemId)}
            onClick={() => handleAddToCart(itemId)}
          >
            <AddRounded />
          </i>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;