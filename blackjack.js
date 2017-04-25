var deck = [];
$(function() {
     deck = newDeck();
     shuffle();
     // deck of cards
     function newDeck () {
          for (var i = 1; i <= 13; i++) {
               deck.push({point: i, suit: 'spades'});
               deck.push({point: i, suit: 'hearts'});
               deck.push({point: i, suit: 'clubs'});
               deck.push({point: i, suit: 'diamonds'});
          }
          return deck;




     }
     // shuffle function
     function getint(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random()* (max-min)) + min;
     }
     function shuffle() {
          for (var i = 0; i < 52; i ++){
          var first = getint(0,52);
          var second = getint(0,52);
          var temp = deck[first];
          deck[first] = deck[second];
          deck[second] = temp;
          }
     }
     // loading images
     var getCardImageUrl = function(card){
          if (card.point >= 2 && card.point <= 10) {
               return 'card_imgs/' + card.point + '_of_'+ card.suit + '.png';
          }
          else if (card.point === 11 ) {
               return 'card_imgs/jack_of_'+ card.suit + '.png';
          }
          else if (card.point === 12 ) {
               return 'card_imgs/queen_of_'+ card.suit + '.png';
          }
          else if (card.point === 13 ) {
               return 'card_imgs/king_of_'+ card.suit + '.png';
          }
          else {
               return 'card_imgs/ace_of_'+ card.suit + '.png';
          }
     };
     // hand arrays
     var dealerhand = [];
     var playerhand = [];
     // dealing four cards logic
     // card 1 dealer
     $('#deal-button').click(function( ) {
          // card 1 player
          var playercard = deck.pop();
          var cardurl3 = getCardImageUrl(playercard);
          $("#player-hand").append('<img src = ' + cardurl3 + '>');
          playerhand.push(playercard);

          console.log("deck len" + deck.length);
          console.log("playerhand: " + playerhand);
          // card 1 dealer
          console.log(deck.length);
          var dealercard = deck.pop();
          var cardurl1 = getCardImageUrl(dealercard);
          $("#dealer-hand").append('<img src = ' + cardurl1 + '>');
          dealerhand.push(dealercard);
          console.log("deck len" + deck.length);
          console.log("dealerhand: " + dealerhand);

          //  card 2 player
          playercard = deck.pop();
          var cardurl4 = getCardImageUrl(playercard);
          $("#player-hand").append('<img src = ' + cardurl4 + '>');
          playerhand.push(playercard);
          console.log("deck len" + deck.length);
          console.log("playerhand: " + playerhand);


          // card 2 dealer
          dealercard = deck.pop();
          var cardurl2 = getCardImageUrl(dealercard);
          $("#dealer-hand").append('<img src = ' + cardurl2 + '>');
          dealerhand.push(dealercard);
          console.log("deck len" + deck.length);
          console.log("dealerhand: " + dealerhand);
          $("#dealer-points").html(calculatePoints(dealerhand));
          $("#player-points").html(calculatePoints(playerhand));


          $("#deal-button").hide();



     });

     // hit button logic
     $("#hit-button").click(function () {
          var hit1 = deck.pop();
          var cardurlhit = getCardImageUrl(hit1);
          $("#player-hand").append('<img src = ' + cardurlhit + '>');
          playerhand.push(hit1);
          console.log("deck len" + deck.length);
          console.log("deck:" + deck);
          console.log("playerhand: " + playerhand);
          $("#dealer-points").html(calculatePoints(dealerhand));
          $("#player-points").html(calculatePoints(playerhand));

          // win checker
          if (calculatePoints(playerhand) >= 21) {
               setTimeout(function () {
                    alert("Player Busts, Dealer Wins!");
               },500);

          }



     });
     // To make it less repetitive
     //  function DealACard (handArray, elementsSelector
     // DealACard(playerhand, "#player-hand")

// Stand button
     $("#stand-button").click(function(){
          if (calculatePoints(dealerhand) <= 17 ){
               dealercard = deck.pop();
               var cardurldd1 = getCardImageUrl(dealercard);
               $("#dealer-hand").append('<img src = ' + cardurldd1 + '>');
               dealerhand.push(dealercard);
               console.log("deck len" + deck.length);
               console.log("dealerhand: " + dealerhand);
          }
          // dealing to dealer function
          function dealDealer() {
               if (calculatePoints(dealerhand) <= 17 ){
                    dealercard = deck.pop();
                    var cardurldd1 = getCardImageUrl(dealercard);
                    $("#dealer-hand").append('<img src = ' + cardurldd1 + '>');
                    dealerhand.push(dealercard);
                    console.log("deck len" + deck.length);
                    console.log("dealerhand: " + dealerhand);

               }
          }
          // actually dealing to dealer
          dealDealer();

          // win checker
          if (calculatePoints(dealerhand) > 21 ) {
               setTimeout(function () {
                    alert("Dealer Busts! Player Wins!");
               },500);

          }
          // win checker
          if (calculatePoints(dealerhand) < calculatePoints(playerhand) && calculatePoints(dealerhand) >= 17) {
               setTimeout(function () {
                    alert("Player Wins!");
               },500);

          }
          // win checker
          if (calculatePoints(playerhand) < calculatePoints(dealerhand) && calculatePoints(dealerhand) < 21) {
               setTimeout(function () {
                    alert("Dealer Wins!");
               },500);


          }
          // win checker
          if (calculatePoints(playerhand) === calculatePoints(dealerhand)) {
               setTimeout(function () {
                    alert("Push!");
               },500);

          }


     });
     //  adding up the points for player and dealer
     function calculatePoints(cards) {
          var sum = 0;

          cards.sort(function(a,b){
               console.log(b.point - a.point);
               return b.point - a.point;
          });
          console.log(cards);

          for (var i = 0; i < cards.length; i++) {
               var toadd = 0;
               if (cards[i].point > 10) {
                    toadd = 10;
               }
               else if (cards[i].point === 1) {
                    if (sum <= 10) {
                         toadd = 11;
                    }
                    else {
                         toadd = 1;
                    }

               }
               else {
                    toadd = cards[i].point;
               }
               sum += toadd;

               console.log("sum: "+sum);
          }
          return sum;
     }
     $("#reset").click(function(){
          $("#deal-button").show();
          var dealerhand = [];
          var playerhand = [];
     $("#dealer-hand").empty();
     $("#player-hand").empty();
     $("#dealer-points").empty();
     $("#player-points").empty();
          });

});
//  If the player is dealt an ace, it is always played as 1
