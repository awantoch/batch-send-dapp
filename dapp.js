import 'babel-polyfill';

import batchSendABI from "./BatchSend.json";

const Web3 = require("web3");

const contractAddress = "0x5e77b65E9eEe186644a5Df779dF25dE3f939D89c";

const dApp = {
  ethEnabled: function() {
    // If the browser has injected Web3.js
    if (window.web3) {
      // Then replace the old injected version by the latest build of Web3.js version 1.0.0
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  },
  init: async function() {
    if (!this.ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }
    this.accounts = await window.web3.eth.getAccounts();
    this.contractAddress = contractAddress;
    this.batchSendContract = new window.web3.eth.Contract(
      batchSendABI,
      this.contractAddress,
      { defaultAccount: this.accounts[0] }
    );
    console.log("Contract object", this.batchSendContract);
  },
  send: function() {
    const addresses = $("#addresses").val().split(",");
    const value = window.web3.utils.toWei($("#value").val(), "ether");
    this.batchSendContract.methods.sendBatch(addresses).send({from: this.accounts[0], value}, ((error) => {
      if (error) alert(error);
    }));
  },
  main: async function() {
    // Initialize web3
    await this.init();
  }
};

window.dApp = dApp;
window.dApp.main();
