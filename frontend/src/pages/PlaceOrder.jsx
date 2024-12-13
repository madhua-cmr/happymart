/* eslint-disable no-case-declarations */
import { useContext, useState } from "react";
import CartTotal from "./CartTotal";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backend_url,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_charges,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("COD");

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phno: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
      };
      console.log(method);

      switch (method) {
        case "COD":
          const response = await axios.post(
            backend_url + "/api/order/cod",
            orderData,
            { headers: { token } }
          );

          console.log(response);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backend_url + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <section>
      <form
        onSubmit={onSubmitForm}
        className="max-padd-container rounded-2xl bg-white mt-8"
      >
        <div className="  gap-4 flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row xs:flex-col ">
          <div className="flex flex-col gap-y-2 flex-1 p-6  mb-14">
            <h2 className="text-[18px] my-8 font-medium">Delivery Address</h2>
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                required
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
              <input
                onChange={onChangeHandler}
                required
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
            </div>

            <input
              onChange={onChangeHandler}
              required
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
            />

            <input
              onChange={onChangeHandler}
              required
              value={formData.phno}
              type="text"
              name="phno"
              placeholder="Contact Number"
              className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
            />
            <input
              onChange={onChangeHandler}
              required
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street Name"
              className="outline-none border-2 rounded-sm p-2 w-[305px] border-slate-300"
            />
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                required
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
              <input
                onChange={onChangeHandler}
                required
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                required
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder="Pin Code"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
              <input
                onChange={onChangeHandler}
                required
                value={formData.country}
                type="text"
                name="country"
                placeholder="Country"
                className="outline-none border-2 rounded-sm p-2 w-full border-slate-300"
              />
            </div>
          </div>
          <div className=" px-10  flex-1 sm:mt-8">
            <div className="mt-8">
              <CartTotal />
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <h2 className="text-[18px] text-sky-900 ">Transaction Method</h2>
              <div className="flex gap-4 sm:gap-8">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`w-[150px] sm:w-[500px] cursor-pointer text-center p-1  ${
                    method === "stripe"
                      ? "bg-sky-400 !font-bold text-white hover:bg-sky-600"
                      : ""
                  } shadow-sm  shadow-slate-200 ring-1 ring-slate-200 text-black  rounded-xl h-[35px]`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("COD")}
                  className={`w-full text-black cursor-pointer p-1 text-center ${
                    method === "COD"
                      ? "bg-sky-400  !font-bold text-white hover:bg-sky-600"
                      : ""
                  } shadow-sm shadow-slate-200 ring-1 ring-slate-200 rounded-xl h-[35px]`}
                >
                  Cash On Delivery
                </div>
              </div>
              <div className=" mb-16 sm:w-[350px]">
                <button
                  type="submit"
                  className="w-full text-white hover:bg-sky-700 bg-sky-950 rounded-xl h-[35px] "
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  );
};

export default PlaceOrder;
