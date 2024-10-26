const cards = document.querySelectorAll(".card");
const backgroundSound = document.getElementById("background-sound");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === 8) {
      setTimeout(() => {
        window.location.href = "menang.html";
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCards() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

// Memutar suara latar ketika pengguna pertama kali berinteraksi dengan halaman
function playBackgroundSound() {
  backgroundSound.play().catch(error => {
    console.error('Error playing the audio:', error);
  });
  document.removeEventListener('click', playBackgroundSound);
  document.removeEventListener('keydown', playBackgroundSound);
}

// Menambahkan event listener untuk klik dan tekan tombol
document.addEventListener('click', playBackgroundSound);
document.addEventListener('keydown', playBackgroundSound);

shuffleCards();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
