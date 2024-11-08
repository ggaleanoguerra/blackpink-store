const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("../json/api.json");
    const data = await res.json();
    showCards(data);
  } catch (error) {
    console.log(error);
  }
};

const showCards = (data) => {
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = product.precio;
    templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  const buttons = items.querySelectorAll("button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      Swal.fire({
        title: `Estás intentando comprar ${data[index].title}`,
        text: "Blackpink in your area",
        icon: "success",
      });
    });
  });
};