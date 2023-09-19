import { showTransactions, functionCalled } from "./showTransactions.js";
// import { doNotHideList } from "./postRequest.js";

export let doNotHideList2 = true;

export async function deleteTransaction(idValue) {
  idValue = +idValue;

  await fetch(`http://localhost:3000/internet-banking/${idValue}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (functionCalled) {
    doNotHideList2 = false;
    setTimeout(() => {
      doNotHideList2 = true;
    }, 1000);
    showTransactions();
  }
}
