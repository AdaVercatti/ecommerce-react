import PropTypes from "prop-types";
import Product from "./Product";

const ProductsGrid = ({ products,loadCart }) => {
    return(
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart}></Product>
        );
      })}
    </div> );
};

export default ProductsGrid

ProductsGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired
};