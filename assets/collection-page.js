const productList = document.querySelector(".collection-page__list");
const loader = document.querySelector('.collection-page__loader')
const productsPerPage = document.querySelector(".collection-page__wrapper").dataset.limit;
const collectionHandle = document.querySelector(".collection-page__wrapper").dataset.handle;
let loading = false;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", onScroll);
    loadMoreProducts(currentPage);
});

function onScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        loadMoreProducts(currentPage);
    }
}

function loadMoreProducts(page) {
    if (loading) return;
    loading = true;

    loader.style.display = 'block';

    const url = `/collections/${collectionHandle}?page=${page}&limit=${productsPerPage}`;

    fetch(url)
        .then(response => response.text())
        .then(data => handleNewProducts(data))
        .catch(() => {
            loading = false;
            loader.style.display = 'none';
        });
}

function handleNewProducts(data) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const newProducts = htmlDoc.querySelectorAll(".product-card-wrapper");

    if (newProducts.length === 0) {
        loader.innerHTML="";
        return;
    }

    newProducts.forEach(function (product) {
        productList.appendChild(product);
    });

    currentPage += 1;
    loading = false;
}
