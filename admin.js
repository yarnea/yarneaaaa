let products = JSON.parse(localStorage.getItem("products")) || [];
const list = document.getElementById("list");

function render() {
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <li>
        ${p.name} - ₹${p.price}
        <button onclick="remove(${i})">❌</button>
      </li>
    `;
  });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").value;

  products.push({ name, price, img });
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

function remove(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

render();
