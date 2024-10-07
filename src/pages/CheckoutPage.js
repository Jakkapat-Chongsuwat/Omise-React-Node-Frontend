import React, { Component } from "react";

import ChekoutCreditCard from "../components/checkoutForm/omise-prebuilt-form/CheckoutCreditCard";
import CheckoutInternetBanking from "../components/checkoutForm/omise-prebuilt-form/CheckoutInternetBanking";

import "./CheckoutPage.css";
import axios from "axios";

export class CartCheckoutPage extends Component {
  state = {
    charge: undefined,
  };

  createCreditCardCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:80/checkout-credit-card",
        data: {
          email,
          name,
          amount,
          token,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = res.data;
      this.setState({ charge: result });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { cart } = this.props;

    return (
      <div className="own-form">
        <div className="cart__summary">
          <h2>Cart Summary</h2>
          <div className="cart-details">
            <h3>Total Amount: </h3>
            <h3>
              <span>
                {" "}
                {new Intl.NumberFormat().format(cart.amount / 100)} thb
              </span>
            </h3>
          </div>
        </div>
        <ChekoutCreditCard
          cart={cart}
          createCreditCardCharge={this.createCreditCardCharge}
        />
        <CheckoutInternetBanking cart={cart} />
        {/* <div className="message">
          {charge && (
            <div>
              <h4>Thank you for your payment with credit card.</h4>
              <p>
                Your payment amount is{" "}
                <span className="amount">{new Intl.NumberFormat().format(charge.amount)} Baht</span>, status:{" "}
                <span
                  className={
                    charge.status === "successful"
                      ? "success"
                      : charge.status === "failed"
                      ? "failed"
                      : "pending"
                  }
                >
                  {charge.status}
                </span>
              </p>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}

export default CartCheckoutPage;
