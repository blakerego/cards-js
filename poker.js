var cardService = {
  
  suits: [
    'Spades',
    'Hearts',
    'Diamonds',
    'Clubs'
  ],

  possibleCardValues: {
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'J':   11,
    'Q':   12,
    'K':   13,
    'A':   14, 
  },

  generateDeck: function () {
    var deck = [];
    cardService.suits.forEach(function (suit) {
      Object.keys(cardService.possibleCardValues).forEach(function (cardVal) {
        deck.push({
          suit: suit,
          stringValue: cardVal,
          numericValue: cardService.possibleCardValues[cardVal]
        });
      });
    });
    return deck;
  },

  shuffleDeckSwap: function (deck, shuffleCount) {
    if (shuffleCount == null) {
      shuffleCount = 300;
    }
    function swap(index1, index2) {
      var temp = deck[index1];
      deck[index1] = deck[index2]; 
      deck[index2] = temp;
    }

    function getRandomCardIndex() {
      return Math.floor(Math.random()*100)%52;
    }

    for (var i = 0; i< 300; i++) {
      swap(getRandomCardIndex(), getRandomCardIndex());
    }
    return deck;
  },

  dealCards: function(deck, handSize) {
    var cards = [];
    while (handSize-- > 0) {
      cards.push(deck.pop());
    }
    return cards;
  }


};

var handFactory = function(cards) {
  
  var hand = {};

  hand.cards = cards;
  hand.cardMap = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: []
  };

  cards.forEach(function(card) {
    hand.cardMap[card.numericValue].push(card);
  });

  return hand;
};


var poker = {
  
  evaluateHand: function(hand) {



  },

  highCard: function(hand) {
    var highestCard = {numericValue: 0};
    console.log(hand.cards.length);

    for (var i = 0; i < hand.cards.length; i++) {
      if (hand.cards[i].numericValue > highestCard.numericValue) {
        highestCard = hand.cards[i];
      }
    }
    return highestCard;
  }

  // 


  // straight flush
  // four of a kind
  // full house
  // flush
  // straight
  // three of a kind
  // two pair
  // one pair
  // high card
};

var d = cardService.generateDeck();
cardService.shuffleDeckSwap(d, 52);

// var myHand = cardService.dealCards(d, 5);

var myCards = [ { suit: 'Spades', stringValue: 'seven', numericValue: 7 },
  { suit: 'Hearts', stringValue: 'A', numericValue: 14 },
  { suit: 'Clubs', stringValue: 'K', numericValue: 13 },
  { suit: 'Diamonds', stringValue: 'J', numericValue: 11 },
  { suit: 'Hearts', stringValue: 'three', numericValue: 3 } ];

var myHand = handFactory(myCards);

console.log(poker.highCard(myHand));

poker.highCard(myHand);
































