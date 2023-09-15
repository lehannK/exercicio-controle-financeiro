import { description, valueTransaction } from "./index.js";
import { showTransactions, functionCalled } from "./showTransactions.js";

export let doNotHideList = true;

export async function postRequest() {
  if (description.value.length > 0 && valueTransaction.value.length > 0) {
    await fetch("http://localhost:3000/internet-banking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: description.value,
        valueTransaction: valueTransaction.value,
      }),
    });

    // só exibe o extrato se o btnShowExtract for clicado. Se sim, a lista é exibida e atualizada sem necessidade de apertar o botão novamente ou dar reload na página
    // doNotHideList serve para impedir que a lista seja ocultada quando o btnSendValue for clicado
    if (functionCalled) {
      doNotHideList = false;
      setTimeout(() => {
        doNotHideList = true;
      }, 1000);
      showTransactions();
    }

    description.value = "";
    valueTransaction.value = "";
  } else {
    alert("Os campos devem ser preenchidos");
  }
}
