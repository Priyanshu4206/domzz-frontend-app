import React from "react";
import logo from "../assests/logo.svg";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineArrowBackIosNew, MdLocationOn } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiVisaLine, RiMastercardFill } from "react-icons/ri";
import { SiPaytm } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-number-input/input";
import "../stylings/checkout.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase_config";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [verfied, setVerfied] = React.useState(false);
  const [showOTP, setshowOTP] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [confirmObj, setConfirmObj] = React.useState("");
  const [location, setLocation] = React.useState("xxxxx-xxxxxxxxx xxxxxx");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verfied) {
      toast.error("Verify Your Number First");
      return;
    }
    const re = /^[A-Za-z]+$/;
    if (Name !== "" || re.test(Name)) {
      setName(Name);
      console.log(Mobile);
      fetch(`https://smiling-erin-sarong.cyclic.app?phone=${Mobile}`).catch(
        (err) => {
          console.log(err);
        }
      );
      toast.success("Ordered Successfully!!!");
      setTimeout(() => {
        navigate("/order");
      }, 4000);
    } else {
      toast.error("Enter a Valid Name");
      return;
    }
  };
  function setUpCaptcha(number) {
    const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
    recaptcha.render();
    return signInWithPhoneNumber(auth, number, recaptcha);
  }
  const onSignup = async () => {
    if (Mobile.length >= 13 && Mobile !== undefined) {
      try {
        const response = await setUpCaptcha(Mobile);
        console.log(response);
        setConfirmObj(response);
        setshowOTP(true);
        toast.success("OTP Sent Sucessfully !!");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      toast.error("Invalid Phone Number !!");
    }
  };
  const otpVerify = async () => {
    if (otp === "" || otp === null) return;
    try {
      await confirmObj.confirm(otp);
      setVerfied(true);
      toast.success("Verified Successfully !!");
    } catch (error) {
      toast.error(error.message);
      setMobile("");
      setOtp("");
      setshowOTP(false);
      setVerfied(false);
    }
  };
  const [Name, setName] = React.useState("");
  const [Mobile, setMobile] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [amount, setAmt] = React.useState(0);

  React.useEffect(() => {
    if (sessionStorage.getItem("cart_items") !== null) {
      const amt = JSON.parse(sessionStorage.getItem("Checkout"));
      setAmt(amt);
    }
    if (sessionStorage.getItem("Location") !== null) {
      const loc = sessionStorage.getItem("Location");
      setLocation(JSON.parse(loc));
    }
  }, []);
  return (
    <div className="checkout_main">
      <section className="header_section">
        <div className="logo">
          <img src={logo} alt="Domzz Pizza" />
        </div>
        <div className="header_divider">
          <Link to="/order">
            <MdOutlineArrowBackIosNew></MdOutlineArrowBackIosNew>
          </Link>
          <div className="sub_head">
            <BsFillShieldLockFill
              style={{
                fontSize: "1.8rem",
              }}
            ></BsFillShieldLockFill>
            <h1>Secure Checkout</h1>
          </div>
        </div>
      </section>
      <section className="main_section">
        <div className="container">
          <div className="location_details inner_containers">
            <MdLocationOn></MdLocationOn>
            <span>
              Odering for collection from <strong> {location} </strong>
            </span>
            <br />
            <span>
              By Domzz Pizza <br />
              Near SDM Colony <br />
              Sikandrabad,district BSR
            </span>
          </div>
          <form
            className="userDetails_input inner_containers"
            onSubmit={handleSubmit}
          >
            <h2>Who's the Order for</h2>
            <div className="input_box">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                name="Name"
                id="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={Name}
                autoComplete="false"
                placeholder="Alphabets Only"
              />
            </div>
            <div className="input_box">
              <label htmlFor="Mobile">Mobile</label>
              <PhoneInput
                name="Mobile"
                id="Mobile"
                country="IN"
                value={Mobile}
                onChange={setMobile}
                placeholder="+91 xxxx-nnnnnn"
              />
              {!showOTP && (
                <>
                  <div id="recaptcha-container"></div>
                  <div className="otp_btn" onClick={onSignup}>
                    Send OTP to Verify
                  </div>
                </>
              )}
            </div>
            {showOTP && !verfied && (
              <div className="input_box">
                <label htmlFor="OTP">OTP</label>
                <input
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  className="opt-container"
                ></input>
                <div onClick={otpVerify} className="otp_btn">
                  Verify OTP
                </div>
              </div>
            )}

            <div className="input_box">
              <label htmlFor="Email">Email Address</label>
              <input
                type="email"
                name="Email"
                id="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={Email}
                autoComplete="false"
                placeholder="example@email.com"
              />
            </div>
            <button type="submit">Place Your Order Rs. {amount}</button>
          </form>
          <div className="payment_options inner_containers">
            <h2>How would you like to pay?</h2>
            <div className="options">
              <label style={{ border: "1px solid red" }}>
                <input type="radio" name="pay" id="online" disabled />
                <span>
                  Online Payment <br />
                  <span style={{ color: "grey", fontSize: "0.8rem" }}>
                    (Currently Unavilable)
                  </span>
                </span>
                <div className="pay_pics">
                  <RiVisaLine className="icons"></RiVisaLine>
                  <RiMastercardFill className="icons"></RiMastercardFill>
                  <SiPaytm className="icons"></SiPaytm>
                </div>
              </label>
              <label>
                <input type="radio" name="pay" id="cod" defaultChecked />
                <span> Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Outlet />;
    </div>
  );
};

export default Checkout;
