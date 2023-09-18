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
export const deleteTextDiv = document.getElementById("delete-text-div");
export const deleteInput = document.getElementById("delete-input");
export const deleteBtnDiv = document.getElementById("delete-btn-div");

btnSendValue.addEventListener("click", postRequest);
btnShowExtract.addEventListener("click", showTransactions);
