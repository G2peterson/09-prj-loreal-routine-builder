const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.getElementById("productsContainer");
const selectedProductsList = document.getElementById("selectedProductsList");
const chatWindow = document.getElementById("chatWindow");

let allProducts = [];
let selectedProducts = [];

// LOAD DATA
async function loadProducts() {
  const res = await fetch("products.json");
  const data = await res.json();
  return data.products;
}

// INIT
loadProducts().then((products) => {
  allProducts = products;

  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
});

// FILTER
categoryFilter.addEventListener("change", () => {
  const filtered = allProducts.filter(
    (p) => p.category === categoryFilter.value,
  );
  displayProducts(filtered);
});

// DISPLAY PRODUCTS
function displayProducts(products) {
  productsContainer.innerHTML = products
    .map(
      (p) => `
    <div class="product-card" onclick="selectProduct(${p.id})">
      <img src="${p.image}" />
      <p>${p.name}</p>
    </div>
  `,
    )
    .join("");
}

// SELECT PRODUCT
function selectProduct(id) {
  const product = allProducts.find((p) => p.id === id);

  if (!selectedProducts.some((p) => p.id === id)) {
    selectedProducts.push(product);
  }

  selectedProductsList.innerHTML = selectedProducts
    .map((p) => `<p>${p.name}</p>`)
    .join("");
}

// GENERATE ROUTINE
document.getElementById("generateRoutine").addEventListener("click", () => {
  if (selectedProducts.length === 0) {
    alert("Select products first");
    return;
  }

  const routine = selectedProducts
    .map((p, i) => `${i + 1}. Use ${p.name}`)
    .join("<br>");

  chatWindow.innerHTML = `<strong>Your Routine:</strong><br>${routine}`;
});

// CHAT
document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("userInput").value;

  chatWindow.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  chatWindow.innerHTML += `<p><strong>Suggestion:</strong> Stay consistent with your routine.</p>`;

  e.target.reset();
});