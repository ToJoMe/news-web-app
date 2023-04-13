const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
// "de" stands for germany
//const country = "us";
let country = "us";
const options = ["general", "entertainment", "health", "science", "sports", "technology", "business"];

// 100 requests per day
let requestURL;

// Create cards from data to fill with articles from API
const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = 
        `<div class="news-image-container">
            <img src="${item.urlToImage || "./newspaper.jpg"} 
            " alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
            ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank"
            class="view-button">Read More</a>
        </div>`
    container.appendChild(card);
    }
};

// News API Call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        altert("Data unavailabel at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
}

// Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active")
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    e.target.classList.add("active");
    getNews();
};

// Options Buttions
const createOptions = () => {
    for(let i of options){
        optionsContainer.innerHTML+= `<button class="option ${i=="general" ? "active" : ""}"
        onclick="selectCategory(event, '${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
    const countrySelect = document.getElementById("country-select");
    countrySelect.addEventListener("change", (event) => {
    country = event.target.value;
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    getNews();
    });
};

// load full website before request the data
window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};

