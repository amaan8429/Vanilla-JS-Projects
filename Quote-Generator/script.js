quoteContainer = document.getElementById("quote-container");
quoteText = document.getElementById("quote-text");
quoteAuthor = document.getElementById("quote-author");
twitterBtn = document.getElementById("twitter");
newQuoteBtn = document.getElementById("new-quote");
loader = document.getElementById("loader");

//loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = []; //to store the quotes array

//to take out one quote from the array after it is fetched and display the quote on the screen
function newQuote() {
  loading();
  const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!newQuote.character.name) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = newQuote.character.name;
  }
  quoteText.textContent = newQuote.sentence;

  if (newQuote.sentence.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  loadingComplete();
}

//to fetch the quotes
async function getQuotes() {
  loading();
  const url = "https://api.gameofthronesquotes.xyz/v1/random/100";
  try {
    const response = await fetch(url);
    apiQuotes = await response.json(); // Add 'await' here
    newQuote();
  } catch (error) {
    quoteText.textContent = "Error Loading the Quote! Try Again";
    getQuotes();
  }
}

//to tweet the quotes
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetUrl, "_blank");
}

//handling button clicks
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//calling the main function
getQuotes();
