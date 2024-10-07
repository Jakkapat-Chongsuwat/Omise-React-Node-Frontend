import React, { Component } from "react";
import Script from "react-load-script";

import "./Checkout.css";

let OmiseCard;

export class Checkout extends Component {
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_61bn43chxcqmyo44sq5",
      currency: "thb",
      frameLabel: "Sabai shop",
      submitLabel: "Pay Now",
      buttonLabel: "Pay with Omise",
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });

    OmiseCard.configureButton("#credit-card");

    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart, createCreditCardCharge } = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token);
        console.log(token);
      },
      onFormClosed: () => {},
    });
  };

  handlePayWithCreditCardBtnclick = (e) => {
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseCardHandler();
  };

  render() {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleScriptLoad}
        />
        <form>
          <button
            id="credit-card"
            className="btn"
            type="button"
            onClick={this.handlePayWithCreditCardBtnclick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
