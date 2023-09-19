export async function deleteTransaction(idValue) {
  idValue = +idValue;

  await fetch(`http://localhost:3000/internet-banking/${idValue}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
