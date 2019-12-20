


// DECLARE GLOBAL VARIABLE clicks = 0, INCREMENT WITHIN CLICK HANDLER AND POPULATE VISIBLE COUNTER 
var clicks = 0;

//SHUFFLE UTILITY COPIED FROM https://medium.com/@oldwestaction/randomness-is-hard-e085decbcbb2
const fisherYatesShuffle = (deck) => {
  for (var i = deck.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    const currentCard = deck[i]
    const cardToSwap = deck[swapIndex]
    deck[i] = cardToSwap
    deck[swapIndex] = currentCard
  }
  return deck
}

// DEFINE reset - LOOP THROUGH AN ARRAY OF CLASS NAMES, RANDOMLY ASSIGN EACH CLASS NAME TO TWO SQUARES, CALL FUNCTION ON PAGE LOAD.
// USE CSS TO EITHER ASSIGN BG IMAGE WHEN IT'S "ON"
function reset() {
  var fifteenClassNamesTwice = ['matcher-1','matcher-2','matcher-3','matcher-4','matcher-5','matcher-6','matcher-7','matcher-8','matcher-9','matcher-10','matcher-11','matcher-12','matcher-13','matcher-14','matcher-15','matcher-1','matcher-2','matcher-3','matcher-4','matcher-5','matcher-6','matcher-7','matcher-8','matcher-9','matcher-10','matcher-11','matcher-12','matcher-13','matcher-14','matcher-15'];
  var shuffledDeck = fisherYatesShuffle(fifteenClassNamesTwice);
  var theCards = document.querySelectorAll('.card'); //IS THIS ALREADY AN ARRAY?
  for (var i=0; i<theCards.length; i++) {
    theCards[i].classList.add(shuffledDeck[i]);
    theCards[i].classList.remove('on');
    theCards[i].classList.remove('done');
  }
  addClickListeners();
}

// DEFINE notMatch - WAIT TWO SECONDS, REMOVE 'ON' CLASS NAME FROM BOTH, THEN REASSIGN CLICK HANDLERS TO ALL CARDS
function noMatch(thisCard,otherCard) {
  setTimeout(function(){thisCard.classList.remove('on'); otherCard.classList.remove('on'); addClickListeners()}, 2000); 
}

// DEFINE cardMatch(currentCard,matchedCard) - GIVE BOTH CARDS A CLASS NAME OF 'done' AND REMOVE ONCLICK HANDLER. CHECK IF THERE ARE ANY OTHER CARDS LEFT W/O A CLASSNAME OF 'done', IF SO, RETURN, IF NOT, CALL checkForWin.
function cardMatch(currentCard,matchedCard) {
  currentCard.classList.add('done');
  currentCard.classList.remove('on'); 
  matchedCard.classList.add('done');
  matchedCard.classList.remove('on');
  setTimeout(function(){if (checkForWin()) { handleWin() } else { addClickListeners() } },200);
  
}

//DEFINE checkForMatch - CHECK IF ANY OTHER CARDS ARE ON, IF YES, UNDO CLICK EVENT HANDLER ACROSS ALL CARDS, CHECK IF 'matcher-' CLASS NAMES MATCH - IF NOT, CALL noMatch, OTHERWISE CALL cardMatch(currentCard,matchedCard)
function checkForMatch(thisCard) {
  var onCards = document.querySelectorAll('.card.on');
  if (onCards.length > 1) {
    removeClickListeners()
    for (var card of onCards) {
      if (card.className != thisCard.className) {
        noMatch(onCards[0],onCards[1])
        return
      }
    }
    cardMatch(onCards[0],onCards[1])
  }
  else {
    return
  }
}

// DEFINE turnCard(e) - DISPLAY THE CARD CONTENT, call checkForMatch
function turnCard(thisCard) {
  thisCard.classList.add('on');
  checkForMatch(thisCard)
}

// DEFINE handleCardClick - ADD ONCLICK HANDLER TO ALL CARDS: INCREMENT clicks, POPULATE VISIBLE COUNTER, INVOKE turnCard
function handleCardClick(event) {
  if (event.target.classList.contains(' on')) {
    return false
  }
  else {
    var thisCard = event.target;
    clicks++;
    document.getElementById('clicks-count').innerHTML = clicks;
    turnCard(thisCard)
  }
}

// DEFINE handleWin - alert('YOU WON WITH X CLICKS!'); ADD RESET BUTTON TO DOM WITH CLICK HANDLER reset
function handleWin() {
  alert('YOU WON WITH ' + clicks + ' CLICKS!');
}
function checkForWin() {
  for (var card of document.querySelectorAll('.card')) {
    if (!card.classList.contains('done'))  {
      return false;
   }                                          
  }
  handleWin()
}

function addClickListeners() {
  for (var card of document.querySelectorAll('.card')) {
    if (!card.classList.contains('done')) {
      card.addEventListener('click', handleCardClick);
    }
  }
}

function removeClickListeners() {
  for (var card of document.querySelectorAll('.card')) {
      card.removeEventListener('click', handleCardClick);
  }
}


reset();
document.getElementById('reset-button').addEventListener('click',function() {document.location.href = document.location.href});
