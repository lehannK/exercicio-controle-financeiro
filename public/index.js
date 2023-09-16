import { postRequest } from "./postRequest.js";
import { showTransactions } from "./showTransactions.js";

export const description = document.getElementById("description");
export const valueTransaction = document.getElementById("value-transaction");
export const btnSendValue = document.getElementById("btn-send-value");
export const transactionList = document.getElementById("transaction-list");
export const btnShowExtract = document.getElementById("show-extract");
export const showTotalValueDiv = document.getElementById(
  "show-total-value-div"
);

btnSendValue.addEventListener("click", postRequest);
btnShowExtract.addEventListener("click", showTransactions);
