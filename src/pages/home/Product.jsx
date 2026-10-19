import axios from "axios";
import moneyFormat from "../../utils/money";
import PropTypes from "prop-types";
import { useState } from "react";

const Product = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [check, setCheck] = useState(false)
  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} data-testid="product-image"/>
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">87</div>
      </div>

      <div className="product-price">${moneyFormat(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          data-testid="quantity-selector"
          value={quantity}
          onChange={(event) => {
            const selectedValue = Number(event.target.value);
            setQuantity(selectedValue);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{opacity: check ? 1 : 0}}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={async () => {
          await axios.post("/api/cart-items", {
            productId: product.id,
            quantity: quantity,
          });
          await loadCart();
          setCheck(true)
          setTimeout(()=>{
            setCheck(false)
          },1500)
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    priceCents: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      stars: PropTypes.number.isRequired,
      count: PropTypes.number,
    }).isRequired,
  }).isRequired,
  loadCart: PropTypes.func.isRequired,
};
export default Product;
