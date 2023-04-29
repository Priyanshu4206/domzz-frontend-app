import React from "react";
import "../stylings/home.css";
import { MdDeliveryDining } from "react-icons/md";
import playstore from "../assests/playstore.png";
import appstore from "../assests/appstore.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();
  const [locate, setLocation] = React.useState("");
  const [address, setAdress] = React.useState("");
  const landmarks = [
    "Heera Colony",
    "Jharkhandi Mohalla",
    "Teacher Colony",
    "Paliwal Colony",
    "Jaat Chowk",
    "SDM Colony",
    "Hanuman Chowk",
    "Kaya Beauty Parlour",
    "Radha Krishna Kunj",
    "Harishay Mohalla",
    "Kast wada",
    "Maha Lakshmi Clothes",
    "Balaji Mandir Rui ka Pech",
    "Bhajan Lal Madir",
    "Others",
  ];
  function handleSubmit(e) {
    e.preventDefault();
    if (address === "" || address === null || locate === "") {
      toast.error("Address & Location can't be empty");
      return;
    }
    sessionStorage.setItem(
      "Location",
      JSON.stringify(address + ", near by " + locate)
    );
    if (
      JSON.parse(sessionStorage.getItem("cart_items")) === null ||
      JSON.parse(sessionStorage.getItem("cart_items")).length === 0
    ) {
      navigate("./order");
    } else {
      navigate("/Checkout");
    }
  }
  return (
    <div className="home_main">
      <ToastContainer />
      <section className="main_section">
        <div className="header">
          <MdDeliveryDining
            style={{
              border: "1px solid red",
              borderRadius: "100%",
              fontSize: "1.8rem",
            }}
          ></MdDeliveryDining>
          <span style={{ fontSize: "1.4rem" }}>Delivery</span>
        </div>
        <h1>Contactless Delivery</h1>
        <h2 className="subHeads">Contactless Delivery is now available!!</h2>
        <form className="locator" onSubmit={handleSubmit}>
          <div className="inputs">
            <select
              required
              name="location"
              id="location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              <option value="">Select a Near By Location ....</option>
              {landmarks.map((landmark, index) => {
                return (
                  <option key={index} value={landmark}>
                    {landmark}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="inputs">
            <input
              required
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => {
                setAdress(e.target.value);
              }}
              placeholder="Address to be deliverd at ...."
            />
          </div>
          <button type="submit">Confirm this location</button>
        </form>
      </section>
      <section className="footer_section">
        <div className="Menu_Links">
          <Link className="links" to="/order">
            Order Now
          </Link>

          <Link to="/" className="links">
            About
          </Link>
          <Link to="/" className="links">
            Our Policies
          </Link>
          <Link to="/" className="links">
            Visit Us
          </Link>
        </div>
        <div className="applinks">
          <a href="/">
            <img src={appstore} alt="Appstore Link"></img>
          </a>
          <a href="/">
            <img src={playstore} alt="Playstore Link"></img>
          </a>
        </div>
        <div className="copyright">
          &copy;2023 Domzz Pizza India All rights reserved
        </div>
      </section>
    </div>
  );
}

export default Home;
