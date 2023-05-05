import React from "react";
import "../stylings/order.css";
import logo from "../assests/logo.svg";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import img1 from "../assests/item1.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Order = () => {
  const [sub_total, setSubTotal] = React.useState(0.0);
  const [total, setTotal] = React.useState(0.0);
  const [option, setOption] = React.useState("Pizza");
  const [products, setProducts] = React.useState([]);
  // const Pizza = [
  //   {
  //     id: "P1",
  //     P_Name: "Small Double Panner",
  //     Price: 500,
  //     Size: "Small",
  //     P_Type: "Veg",
  //     Imglink: "../assests/item1.jpg",
  //     P_Desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //     Deserunt, temporibus rem fugit dignissimos qui aliquid
  //     quae, facere eligendi ullam quasi dolorem enim laboriosam
  //     odio est quas quam, assumenda voluptate delectus.`,
  //   },
  //   {
  //     id: "P2",
  //     P_Name: "Medium Double Cheese",
  //     Price: 300,
  //     Size: "Medium",
  //     P_Type: "Veg",
  //     Imglink: "../assests/item1.jpg",
  //     P_Desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //     Deserunt, temporibus rem fugit dignissimos qui aliquid
  //     quae, facere eligendi ullam quasi dolorem enim laboriosam
  //     odio est quas quam, assumenda voluptate delectus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, dolorem molestias. Voluptas ut iusto blanditiis aliquam perferendis delectus nam rerum?`,
  //   },
  // ];
  // const Drinks = [
  //   {
  //     id: "D1",
  //     P_Name: "Thumbs Up Cold Drink",
  //     Price: 100,
  //     Imglink: "../assests/item1.jpg",
  //     P_Desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //     Deserunt, temporibus rem fugit dignissimos qui aliquid
  //     quae, facere eligendi ullam quasi dolorem enim laboriosam
  //   odio est quas quam, assumenda voluptate delectus.`,
  //   },
  // ];
  // const Sides = [
  //   {
  //     id: "S1",
  //     P_Name: "Burger",
  //     Price: 100,
  //     Size: "Medium",
  //     Imglink: "../assests/item1.jpg",
  //     P_Desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, dolorem molestias. Voluptas ut iusto blanditiis aliquam perferendis delectus nam rerum?`,
  //   },
  // ];
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/getData")
      .then((res) => {
        setProducts(res.data.Result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [location, setLocation] = React.useState("xxxxx-xxxxxxxxx xxxxxx");
  const [valid, setValid] = React.useState(false);
  const [cart_items, setCart] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (sessionStorage.getItem("cart_items") !== null) {
      const arr = sessionStorage.getItem("cart_items");
      setCart(JSON.parse(arr));
    }
    if (sessionStorage.getItem("Location") !== null) {
      const loc = sessionStorage.getItem("Location");
      setLocation(JSON.parse(loc));
      setValid(true);
    }
  }, []);
  const handleCart = (loc, index) => {
    if (loc === 2) {
      setCart((current) => {
        return [...current, { ...products[loc][index] }];
      });
    } else {
      setCart((current) => {
        return [...current, { ...products[loc][index] }];
      });
    }
  };
  React.useEffect(() => {
    var amt = 0;
    cart_items.forEach((item) => {
      amt += item.Price;
    });
    setSubTotal(amt);
    setTotal(amt * 0.05 + amt);
  }, [cart_items]);
  return (
    <div className="order_main">
      <ToastContainer />
      <section className="header">
        <div className="upper_head">
          <img
            src={logo}
            alt="Domzz Pizza"
            onClick={() => {
              navigate("/home");
            }}
          />
          <div className="order_address">
            <MdLocationOn></MdLocationOn>
            <span>
              Ordering for Collections from <strong>{location}</strong>
            </span>
          </div>
        </div>
        <nav>
          <ul className="menu_options">
            <a
              href="#Pizza"
              className={option === "Pizza" ? "active" : ""}
              onClick={() => {
                setOption("Pizza");
              }}
            >
              Pizzas
            </a>
            <a
              href="#Sides"
              className={option === "Slides" ? "active" : ""}
              onClick={() => {
                setOption("Slides");
              }}
            >
              Sides
            </a>
            <a
              href="#Drinks"
              className={option === "Drinks" ? "active" : ""}
              onClick={() => {
                setOption("Drinks");
              }}
            >
              Drinks
            </a>
          </ul>
          <div
            className="side_menu_btn"
            style={toggle ? { display: "none" } : {}}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <span> View Cart</span>
            <AiOutlineShoppingCart className="cart-icon"></AiOutlineShoppingCart>
          </div>
        </nav>
      </section>
      <section className="display_platform" id="display_area">
        {products.map((product, index) => {
          return (
            <div key={index} className="item_containers">
              <div
                className="heading"
                id={index === 0 ? "Pizza" : index === 1 ? "Sides" : "Drinks"}
              >
                <hr />
                <h1>
                  {index === 0 ? "Pizza" : index === 1 ? "Sides" : "Drinks"}
                </h1>
                <hr />
              </div>
              <div className="items_display">
                {product.map((item, item_number) => {
                  return (
                    <div key={item_number} className="item-card">
                      <div className="item_pic">
                        <img src={img1} alt={item.P_Name} />
                      </div>
                      <div className="item_content">
                        <h2>{item.P_Name}</h2>
                        <p className="P_Desc">{item.P_Desc}</p>
                        <div
                          className="choices"
                          style={
                            index !== 2
                              ? { display: "flex" }
                              : { display: "none" }
                          }
                        >
                          <strong>Size & Crust Selected :-</strong>
                          <span>{item.Size}</span>
                        </div>
                        <div
                          className="add_btn"
                          onClick={() => {
                            handleCart(index, item_number);
                          }}
                        >
                          <span>Add</span>
                          <span>&#x20B9; {item.Price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
      <section className={toggle ? `show basket_platform` : `basket_platform`}>
        <ImCross
          className="close_btn"
          onClick={() => {
            setToggle(!toggle);
          }}
        ></ImCross>
        <h1>Your Basket</h1>
        <ul className="cart_list">
          {cart_items.map((item, index) => {
            return (
              <li key={index}>
                <span className="title">
                  <strong> {item.P_Name}</strong>
                  <br />
                  {item.Size}
                </span>
                <span className="cost">&#x20B9; {item.Price}</span>
                <ImCross
                  className="cross_btn"
                  onClick={() => {
                    setCart(cart_items.filter((current, ind) => ind !== index));
                  }}
                ></ImCross>
              </li>
            );
          })}
        </ul>
        <div className="payemnt_det">
          <div className="sub_head box">
            <h3>Subtotal</h3>
            <span>&#x20B9;{sub_total}</span>
          </div>
          <div className="taxes">
            <div className="box">
              <h4>Total Taxes</h4>
              <span>&#x20B9;{(sub_total * 0.05).toFixed(2)}</span>
            </div>
            <div className="box light">
              <span>CGST</span>
              <span>&#x20B9;{(sub_total * 0.05).toFixed(2)}</span>
            </div>
            <div className="box light">
              <span>SGST</span>
              <span>&#x20B9;{(sub_total * 0.05).toFixed(2)}</span>
            </div>
          </div>
          <div className="sub_head box">
            <h3>Amount Payable</h3>
            <span>&#x20B9;{total}</span>
          </div>
          <div
            className="checkout_btn"
            onClick={() => {
              sessionStorage.setItem("cart_items", JSON.stringify(cart_items));
              sessionStorage.setItem("Checkout", JSON.stringify(total));
              valid
                ? cart_items.length
                  ? navigate("/checkout")
                  : toast.error("Empty Cart")
                : navigate("/");
            }}
          >
            <span className="item_count">{cart_items.length} items</span>
            <span>Checkout</span>
            <span>&#x20B9;{total}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
