import {
  transactionList,
  btnShowExtract,
  showTotalValueDiv,
  deleteTextDiv,
  deleteInput,
  deleteBtnDiv,
} from "./index.js";
import { doNotHideList } from "./postRequest.js";
import { doNotHideList2, deleteTransaction } from "./deleteTransaction.js";

export let functionCalled = false; // variável para saber se a função showTransactions foi chamada

// variáveis para cálculo de saldo total
export let totalArray = [];
export let totalValue = 0;

export async function showTransactions() {
  // necessário zerar a array a cada chamada para ela não somar os valores indefinidamente
  totalArray.length = 0;

  // Remove a lista antiga antes de exibir a nova, para não duplicar informação
  let removeOldList = document.querySelectorAll(".extract");
  removeOldList.forEach((item) => item.remove());

  // GET para obter os valores atuais que estão armazenados no JSON
  const response = await fetch("http://localhost:3000/internet-banking");
  const dataJson = await response.json();

  dataJson.forEach((element) => {
    // ignora o ID:0 que serve apenas como base de gerenciamento do json-server
    if (element.id > 0) {
      const descriptionItem = document.createElement("div");
      descriptionItem.classList.add("extract");
      descriptionItem.innerHTML = "Descrição: " + element.description;
      transactionList.appendChild(descriptionItem);

      const valueTransactionItem = document.createElement("div");
      valueTransactionItem.classList.add("extract");
      valueTransactionItem.innerHTML = "Valor: R$" + element.valueTransaction;
      transactionList.appendChild(valueTransactionItem);

      const transactionId = document.createElement("div");
      transactionId.classList.add("extract");
      transactionId.innerHTML = "ID: " + element.id;
      transactionList.appendChild(transactionId);

      const hr = document.createElement("hr");
      hr.classList.add("extract");
      transactionList.appendChild(hr);

      // alimenta a array com as informações de transações
      element.valueTransaction = +element.valueTransaction;
      totalArray.push(element.valueTransaction);
    }
  });

  // soma todos os valores da array
  totalValue = totalArray.reduce((acumulator, element) => acumulator + element);
  console.log(totalValue);

  const showTotalValue = document.createElement("div");
  showTotalValue.classList.add("extract");
  showTotalValue.innerHTML = "Saldo Total: R$" + totalValue;
  showTotalValueDiv.appendChild(showTotalValue);

  const deleteText = document.createElement("div");
  deleteText.classList.add("extract");
  deleteText.innerHTML = "Deletar uma transação";
  deleteTextDiv.appendChild(deleteText);

  const deleteInputValue = document.createElement("input");
  deleteInputValue.type = "number";
  deleteInputValue.classList.add("extract");
  deleteInputValue.placeholder = "Insira o ID da transação";
  deleteInput.appendChild(deleteInputValue);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("extract");
  deleteBtn.innerHTML = "Deletar";
  deleteBtnDiv.appendChild(deleteBtn);

  // envia o ID selecionado para a função deleteTransactions
  deleteBtn.addEventListener("click", function () {
    deleteTransaction(deleteInputValue.value);
  });

  // alternar a opção do botão btnShowExtract entre ocultar / exibir
  if (doNotHideList && doNotHideList2) {
    functionCalled = !functionCalled;

    if (functionCalled) {
      btnShowExtract.innerHTML = "Ocultar Extrato";
    } else {
      btnShowExtract.innerHTML = "Exibir Extrato";
      removeOldList = document.querySelectorAll(".extract");
      removeOldList.forEach((item) => item.remove());
    }
  }
}
