import { transactionList } from "./index.js";
import { totalArray } from "./showTransactions.js";

export async function deleteTransaction(idValue) {
  idValue = +idValue;

  // Remove a lista antiga antes de exibir a nova, para não duplicar informação
  let removeOldList = document.querySelectorAll(".extract");
  removeOldList.forEach((item) => item.remove());

  await fetch(`http://localhost:3000/internet-banking/${idValue}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // GET para obter os valores atuais que estão armazenados no JSON
  const response = await fetch("http://localhost:3000/internet-banking");
  const dataJson = await response.json();

  // imprime o novo JSON sem o elemento excluído
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
}
