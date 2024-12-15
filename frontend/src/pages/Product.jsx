import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProduct = products.find((item) => item._id === productId);
    if (fetchProduct) {
      setProduct(fetchProduct);
      setImage(fetchProduct.image[0]);
    }
  }, [productId, products]);
  if (!product) {
    return <p>Loading product details ...</p>;
  }
  return (
    <section>
      <div className="max-padd-container">
        <div className="max-padd-container  flex gap-12 flex-col md:items-center xl:flex-row bg-white py-16 rounded-2xl">
          <div className="flex   gap-x-2  ">
            <div className="  flex flex-col gap-[4px] flex-1/2 max-sm:flex-1/4   flex-wrap">
              {product.image.map((item, i) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={i}
                  alt="productImg"
                  className="max-w-[70px] rounded-lg"
                />
              ))}
            </div>

            <div className="flex-1 max-w-96">
              <img src={image} alt="image" className="rounded " />
            </div>
          </div>
          <div className="flex  flex-1 flex-col  gap-4 max-xl:ml-40 max-sm:m-0">
            <h3 className="text-[18px] capitalize font-bold ">
              {product.name}
            </h3>
            <div className="flex ">
              <h3 className="text-[18px] font-bold">
                {currency} {product.price}
              </h3>
              <div className="flex text-yellow-400 ">
                <div className="flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
                <span>(122)</span>
              </div>
            </div>
            <p className="text-[16px] font-medium">{product.description}</p>
            <div className="my-4">
              <div className="flex ">
                {[...product.sizes]
                  .sort((a, b) => {
                    const order = ["S", "M", "L", "XL", "XXL"];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((item, i) => (
                    <button
                      onClick={() => setSize(item)}
                      key={i}
                      className={`${
                        item === size
                          ? "!bg-sky-900 text-white"
                          : "border-slate-900/5 "
                      } border-[1.5px] border-zinc-600 h-8 w-10 bg-primary shadow-md shadow-slate-500 mr-4 rounded-md`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product._id, size)}
                className="w-[350px] h-[45px] rounded-2xl text-[18px] bg-sky-950 hover:bg-sky-800 cursor-pointer text-white "
              >
                Add to Cart
              </button>
              <button>
                <FcLike className="text-[22px] cursor-pointer " />
              </button>
            </div>
            <div className="flex gap-2">
              <MdDeliveryDining className="text-[24px]" />
              <span>
                Free Delivery on orders above{" "}
                <span className="font-semibold">Rs 500 </span>
              </span>
            </div>
            <hr className="w-[500px] border-gray-200 rounded-2xl" />
            <div className="text-[14px] font-light">
              <p>Shop with Confidence</p>
              <p>Cash on Delivery for Convenience</p>
              <p>Easy Return and Exchange Policy</p>
            </div>
          </div>
        </div>
        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
        />
      </div>
      <Footer />
    </section>
  );
};

export default Product;
