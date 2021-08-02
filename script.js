"use strict";
/* -- Main Play board -- */
const player = document.querySelector(".player--0");
const dealer = document.querySelector(".player--1");
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const poker10E1 = document.getElementById("poker-1-0");
const announce = document.querySelector(".announce");
const totalDisplay = document.querySelector(".total");
const betAmount = document.querySelector(".bet-amount");
/* -- Bet Module -- */
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const bankDisplay = document.querySelector(".bank");
const warning = document.querySelector(".warning");
const betDisplay = document.querySelector(".bet-choose");
const token002 = document.querySelector(".token--2");
const token010 = document.querySelector(".token--10");
const token050 = document.querySelector(".token--50");
const token100 = document.querySelector(".token--100");
const token500 = document.querySelector(".token--500");
/* -- New Game Module -- */
const modal02 = document.querySelector(".modal-2");
const highestDisplay = document.querySelector(".highest");
/* -- Button --*/
const againBtn = document.querySelector(".btn--again");
const insuranceBtn = document.querySelector(".btn--insurance");
const hitBtn = document.querySelector(".btn--hit");
const standBtn = document.querySelector(".btn--stand");
const resetBtn = document.querySelector(".btn--reset");
const dealBtn = document.querySelector(".btn--deal");
const allInBtn = document.querySelector(".btn--allIn");
const doubleBtn = document.querySelector(".btn--double");
const newGameBtn = document.querySelector(".btn--newGame");

/* Poker */
let poker10Num, poker10Pat, softHandPlayer, softHandDealer;
let playing, score, playerCurrentPoker, dealerCurrentPoker;
let num01,
  num02,
  num03,
  num04,
  num05,
  num06,
  num07,
  num08,
  num09,
  num10,
  num11,
  num12,
  num13;
let club01,
  club02,
  club03,
  club04,
  club05,
  club06,
  club07,
  club08,
  club09,
  club10,
  club11,
  club12,
  club13;
let heart01,
  heart02,
  heart03,
  heart04,
  heart05,
  heart06,
  heart07,
  heart08,
  heart09,
  heart10,
  heart11,
  heart12,
  heart13;
let spade01,
  spade02,
  spade03,
  spade04,
  spade05,
  spade06,
  spade07,
  spade08,
  spade09,
  spade10,
  spade11,
  spade12,
  spade13;
let diamond01,
  diamond02,
  diamond03,
  diamond04,
  diamond05,
  diamond06,
  diamond07,
  diamond08,
  diamond09,
  diamond10,
  diamond11,
  diamond12,
  diamond13;
const set = 2,
  resetPoint = 39;
let pokerTotal = 52 * set;
/* Bet */
let bank = 1500,
  highest = bank,
  bet;
const resetPoker = function () {
  num01 = 0;
  num02 = 0;
  num03 = 0;
  num04 = 0;
  num05 = 0;
  num06 = 0;
  num07 = 0;
  num08 = 0;
  num09 = 0;
  num10 = 0;
  num11 = 0;
  num12 = 0;
  num13 = 0;

  club01 = 0;
  club02 = 0;
  club03 = 0;
  club04 = 0;
  club05 = 0;
  club06 = 0;
  club07 = 0;
  club08 = 0;
  club09 = 0;
  club10 = 0;
  club11 = 0;
  club12 = 0;
  club13 = 0;

  heart01 = 0;
  heart02 = 0;
  heart03 = 0;
  heart04 = 0;
  heart05 = 0;
  heart06 = 0;
  heart07 = 0;
  heart08 = 0;
  heart09 = 0;
  heart10 = 0;
  heart11 = 0;
  heart12 = 0;
  heart13 = 0;

  spade01 = 0;
  spade02 = 0;
  spade03 = 0;
  spade04 = 0;
  spade05 = 0;
  spade06 = 0;
  spade07 = 0;
  spade08 = 0;
  spade09 = 0;
  spade10 = 0;
  spade11 = 0;
  spade12 = 0;
  spade13 = 0;

  diamond01 = 0;
  diamond02 = 0;
  diamond03 = 0;
  diamond04 = 0;
  diamond05 = 0;
  diamond06 = 0;
  diamond07 = 0;
  diamond08 = 0;
  diamond09 = 0;
  diamond10 = 0;
  diamond11 = 0;
  diamond12 = 0;
  diamond13 = 0;
};

const init = function () {
  /* Out of Credit? New Game: Choose Bets; */
  if (bank <= 0) {
    modal02.classList.remove("hidden");
    highestDisplay.textContent = highest;
    bank = 1500;
    highest = bank;
  } else {
    modal.classList.remove("hidden");
  }

  /* --Display Bet Module -- */
  bet = 0;
  overlay.classList.remove("hidden");
  bankDisplay.textContent = bank;
  betDisplay.textContent = bet;
  warning.classList.add("hidden");
  /* Reset Play Board */
  playing = true;
  player.classList.remove("player--winner");
  dealer.classList.remove("player--winner");
  player.classList.add("player--active");
  dealer.classList.remove("player--active");
  announce.classList.add("hidden");
  announce.classList.remove("jack");
  againBtn.classList.add("hidden");
  insuranceBtn.classList.add("hidden");
  hitBtn.classList.remove("hidden");
  standBtn.classList.remove("hidden");
  doubleBtn.classList.add("hidden");
  score0El.textContent = "?";
  score1El.textContent = "?";
  /*hid poker 2 to 5*/
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      if (i < 2)
        document.getElementById(`poker-${i}-${j}`).src = `img/poker-3-0.jpg`;
      else document.getElementById(`poker-${j}-${i}`).classList.add("hidden");
    }
  }

  softHandPlayer = 0;
  softHandDealer = 0;
  score = [0, 0];
};

const token = function (amount) {
  if (bank >= amount) {
    bank -= amount;
    bet += amount;
    betDisplay.textContent = bet;
    bankDisplay.textContent = bank;
  }
};

const pokerNumber = function () {
  let pokerNum, pattern;
  let valid = false;
  while (valid == false) {
    pokerNum = Math.trunc(Math.random() * 13) + 1;
    pattern = Math.trunc(Math.random() * 4) + 1;
    console.log(pokerNum, pattern);
    switch (pokerNum) {
      case 1:
        if (num01 < 4 * set) {
          num01++;
          switch (pattern) {
            case 1:
              if (club01 < set) {
                club01++;
                valid = true;
              }
              break;
            case 2:
              if (heart01 < set) {
                heart01++;
                valid = true;
              }
              break;
            case 3:
              if (spade01 < set) {
                spade01++;
                valid = true;
              }
              break;
            case 4:
              if (diamond01 < set) {
                diamond01++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 2:
        if (num02 < 4 * set) {
          num02++;
          switch (pattern) {
            case 1:
              if (club02 < set) {
                club02++;
                valid = true;
              }
              break;
            case 2:
              if (heart02 < set) {
                heart02++;
                valid = true;
              }
              break;
            case 3:
              if (spade02 < set) {
                spade02++;
                valid = true;
              }
              break;
            case 4:
              if (diamond02 < set) {
                diamond02++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 3:
        if (num03 < 4 * set) {
          num03++;
          switch (pattern) {
            case 1:
              if (club03 < set) {
                club03++;
                valid = true;
              }
              break;
            case 2:
              if (heart03 < set) {
                heart03++;
                valid = true;
              }
              break;
            case 3:
              if (spade03 < set) {
                spade03++;
                valid = true;
              }
              break;
            case 4:
              if (diamond03 < set) {
                diamond03++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 4:
        if (num04 < 4 * set) {
          num04++;
          switch (pattern) {
            case 1:
              if (club04 < set) {
                club04++;
                valid = true;
              }
              break;
            case 2:
              if (heart04 < set) {
                heart04++;
                valid = true;
              }
              break;
            case 3:
              if (spade04 < set) {
                spade04++;
                valid = true;
              }
              break;
            case 4:
              if (diamond04 < set) {
                diamond04++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 5:
        if (num05 < 4 * set) {
          num05++;
          switch (pattern) {
            case 1:
              if (club05 < set) {
                club05++;
                valid = true;
              }
              break;
            case 2:
              if (heart05 < set) {
                heart05++;
                valid = true;
              }
              break;
            case 3:
              if (spade05 < set) {
                spade05++;
                valid = true;
              }
              break;
            case 4:
              if (diamond05 < set) {
                diamond05++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 6:
        if (num06 < 4 * set) {
          num06++;
          switch (pattern) {
            case 1:
              if (club06 < set) {
                club06++;
                valid = true;
              }
              break;
            case 2:
              if (heart06 < set) {
                heart06++;
                valid = true;
              }
              break;
            case 3:
              if (spade06 < set) {
                spade06++;
                valid = true;
              }
              break;
            case 4:
              if (diamond06 < set) {
                diamond06++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 7:
        if (num07 < 4 * set) {
          num07++;
          switch (pattern) {
            case 1:
              if (club07 < set) {
                club07++;
                valid = true;
              }
              break;
            case 2:
              if (heart07 < set) {
                heart07++;
                valid = true;
              }
              break;
            case 3:
              if (spade07 < set) {
                spade07++;
                valid = true;
              }
              break;
            case 4:
              if (diamond07 < set) {
                diamond07++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 8:
        if (num08 < 4 * set) {
          num08++;
          switch (pattern) {
            case 1:
              if (club08 < set) {
                club08++;
                valid = true;
              }
              break;
            case 2:
              if (heart08 < set) {
                heart08++;
                valid = true;
              }
              break;
            case 3:
              if (spade08 < set) {
                spade08++;
                valid = true;
              }
              break;
            case 4:
              if (diamond08 < set) {
                diamond08++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 9:
        if (num09 < 4 * set) {
          num09++;
          switch (pattern) {
            case 1:
              if (club09 < set) {
                club09++;
                valid = true;
              }
              break;
            case 2:
              if (heart09 < set) {
                heart09++;
                valid = true;
              }
              break;
            case 3:
              if (spade09 < set) {
                spade09++;
                valid = true;
              }
              break;
            case 4:
              if (diamond09 < set) {
                diamond09++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 10:
        if (num10 < 4 * set) {
          num10++;
          switch (pattern) {
            case 1:
              if (club10 < set) {
                club10++;
                valid = true;
              }
              break;
            case 2:
              if (heart10 < set) {
                heart10++;
                valid = true;
              }
              break;
            case 3:
              if (spade10 < set) {
                spade10++;
                valid = true;
              }
              break;
            case 4:
              if (diamond10 < set) {
                diamond10++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 11:
        if (num11 < 4 * set) {
          num11++;
          switch (pattern) {
            case 1:
              if (club11 < set) {
                club11++;
                valid = true;
              }
              break;
            case 2:
              if (heart11 < set) {
                heart11++;
                valid = true;
              }
              break;
            case 3:
              if (spade11 < set) {
                spade11++;
                valid = true;
              }
              break;
            case 4:
              if (diamond11 < set) {
                diamond11++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 12:
        if (num12 < 4 * set) {
          num12++;
          switch (pattern) {
            case 1:
              if (club12 < set) {
                club12++;
                valid = true;
              }
              break;
            case 2:
              if (heart12 < set) {
                heart12++;
                valid = true;
              }
              break;
            case 3:
              if (spade12 < set) {
                spade12++;
                valid = true;
              }
              break;
            case 4:
              if (diamond12 < set) {
                diamond12++;
                valid = true;
              }
              break;
          }
        }
        break;
      case 13:
        if (num13 < 4 * set) {
          num13++;
          switch (pattern) {
            case 1:
              if (club13 < set) {
                club13++;
                valid = true;
              }
              break;
            case 2:
              if (heart13 < set) {
                heart13++;
                valid = true;
              }
              break;
            case 3:
              if (spade13 < set) {
                spade13++;
                valid = true;
              }
              break;
            case 4:
              if (diamond13 < set) {
                diamond13++;
                valid = true;
              }
              break;
          }
        }
        break;
    }
  }
  pokerTotal--;
  totalDisplay.textContent = pokerTotal;
  return [pokerNum, pattern];
};

let getPoker = function (turn, currentPoker, softHand, score) {
  let [pokerNum, pattern] = pokerNumber();
  document.getElementById(
    `poker-${turn}-${currentPoker}`
  ).src = `img/poker-${pattern}-${pokerNum}.jpg`;
  if (pokerNum > 10) pokerNum = 10;
  else if (pokerNum === 1) {
    pokerNum = 11;
    softHand = true;
  }
  score += pokerNum;
  document
    .getElementById(`poker-${turn}-${currentPoker}`)
    .classList.remove("hidden");
  while (softHand > 0 && score > 21) {
    score -= 10;
    softHand--;
  }
  currentPoker++;
  return [score, currentPoker, softHand];
};

const hit = function () {
  if (playing) {
    doubleBtn.classList.add("hidden");
    insuranceBtn.classList.add("hidden");
    if (score[0] != 21) {
      [score[0], playerCurrentPoker, softHandPlayer] = getPoker(
        0,
        playerCurrentPoker,
        softHandPlayer,
        score[0]
      );
    }
    if (score[0] > 21 || score[1] === 21) dealerWin();
    else if (score[0] === 21) playerWin();
    score0El.textContent = score[0];
  }
};

const stand = function () {
  if (playing) {
    insuranceBtn.classList.add("hidden");
    player.classList.toggle("player--active");
    dealer.classList.toggle("player--active");
    while (score[1] < 17) {
      [score[1], dealerCurrentPoker, softHandDealer] = getPoker(
        1,
        dealerCurrentPoker,
        softHandDealer,
        score[1]
      );
    }
    if (score[1] === 21 && dealerCurrentPoker === 2) dealerWin();
    else if (score[1] > 21) playerWin();
    else if (score[0] > score[1]) playerWin();
    else if (score[0] === score[1]) tie();
    else dealerWin();
    score1El.textContent = score[1];
  }
};

const end = function () {
  playing = false;
  poker10E1.src = `img/poker-${poker10Pat}-${poker10Num}.jpg`;
  announce.classList.remove("hidden");
  againBtn.classList.remove("hidden");
  doubleBtn.classList.add("hidden");
  hitBtn.classList.add("hidden");
  standBtn.classList.add("hidden");
  score1El.textContent = score[1];
};

const playerWin = function () {
  if (score[0] === 21 && playerCurrentPoker === 2) {
    betAmount.textContent = `+${bet} x 1.5`;
    bet *= 2.5;

    announce.textContent = "Black Jack!";
    announce.classList.add("jack");
  } else {
    betAmount.textContent = `+${bet}`;
    bet *= 2;
    announce.textContent = "You Win";
  }
  end();
  player.classList.add("player--winner");
  bank += bet;
  if (bank > highest) highest = bank;
};

const dealerWin = function () {
  dealer.classList.add("player--winner");
  end();
  if (score[1] === 21 && dealerCurrentPoker === 2) {
    announce.textContent = "Black Jack!";
    announce.classList.add("jack");
    bank -= 0.5 * bet;
    betAmount.textContent = `-${bet} x 1.5`;
  } else {
    announce.textContent = "Dealer Win";
    betAmount.textContent = `-${bet}`;
  }
};

const tie = function () {
  bank += bet;
  end();
  betAmount.textContent = bet;
  announce.textContent = "Push";
};

resetPoker();
init();

token002.addEventListener("click", function () {
  token(2);
});
token010.addEventListener("click", function () {
  token(10);
});
token050.addEventListener("click", function () {
  token(50);
});
token100.addEventListener("click", function () {
  token(100);
});
token500.addEventListener("click", function () {
  token(500);
});

resetBtn.addEventListener("click", function () {
  bank += bet;
  bet = 0;
  betDisplay.textContent = bet;
  bankDisplay.textContent = bank;
  warning.classList.add("hidden");
});

dealBtn.addEventListener("click", function () {
  /* Reset Porker */
  if (pokerTotal < resetPoint) {
    announce.textContent = "Shuffling..";
    announce.classList.remove("hidden");
    /* Reset Porker */
    resetPoker();
    pokerTotal = 52 * set;
    totalDisplay.textContent = pokerTotal;
    setTimeout(function () {
      announce.classList.add("hidden");
    }, 1500);
  }
  if (bet > 0) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    betAmount.textContent = bet;
    if (bank >= bet) {
      doubleBtn.classList.remove("hidden");
    }
    setTimeout(function () {
      /*distribute card 0 and 1*/
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          let [pokerNum, pattern] = pokerNumber();
          if (i === 1 && j === 0) {
            poker10Num = pokerNum;
            poker10Pat = pattern;
          } else {
            document.getElementById(
              `poker-${i}-${j}`
            ).src = `img/poker-${pattern}-${pokerNum}.jpg`;
          }

          if (pokerNum > 10) pokerNum = 10;
          else if (pokerNum === 1) {
            pokerNum = 11;
            if (i === 0) softHandPlayer++;
            else softHandDealer++;
          }
          score[i] += pokerNum;
        }
      }
      playerCurrentPoker = 2;
      dealerCurrentPoker = 2;

      while (softHandPlayer > 0 && score[0] > 21) {
        score[0] -= 10;
        softHandPlayer--;
      }
      score0El.textContent = score[0];

      if (score[0] === 21 && score[1] !== 21) {
        playerWin();
      } else if (score[0] === 21 && score[1] === 21) {
        announce.textContent = "Push";
        announce.classList.add("jack");
      } else if (score[1] - (poker10Num > 10 ? 10 : poker10Num) === 11) {
        insuranceBtn.classList.remove("hidden");
      }
      console.log(
        `poker10Num: ${poker10Num}, score[1] - poker10Num: ${
          score[1] - (poker10Num > 10 ? 10 : poker10Num)
        }`
      );
    }, 500);
  } else {
    warning.classList.remove("hidden");
  }
});

allInBtn.addEventListener("click", function () {
  bet += bank;
  bank = 0;
  betDisplay.textContent = bet;
  bankDisplay.textContent = bank;
});

doubleBtn.addEventListener("click", function () {
  if (playing) {
    bank -= bet;
    bet *= 2;
    betAmount.textContent = bet;
    hit();
    stand();
  }
});
againBtn.addEventListener("click", init);
insuranceBtn.addEventListener("click", function () {
  this.classList.add("hidden");
  if (score[1] === 21) {
    bank += bet * 0.5;
    dealerWin();
  } else {
    bank -= bet * 0.5;
    announce.classList.remove("hidden");
    announce.textContent = "No Black Jack!";
  }
});
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

newGameBtn.addEventListener("click", function () {
  modal02.classList.add("hidden");
  modal.classList.remove("hidden");
});
