const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let bordLocked = false;
let firstCard, secondCard;

const flipCard = (element) => {
  if (bordLocked) return;

  const target = element.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");

  console.log(target.dataset.framework);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = target;
  } else {
    hasFlippedCard = false;
    secondCard = target;
    checkforMatch();
  }
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const unflipCards = () => {
  bordLocked = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBord();
  }, 1000);
};

const resetBord = () => {
  hasFlippedCard = bordLocked = false;
  firstCard = secondCard = null;
};

const checkforMatch = () => {
  const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
  isEqual ? disableCards() : unflipCards();
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});
