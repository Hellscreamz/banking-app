'use strict';

const account1 = {
  owner: 'John Wick',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Harley Quinn',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Steven Spielberg',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2020-09-01T13:15:33.035Z',
    '2020-01-30T09:48:16.867Z',
    '2020-03-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-06-05T16:33:06.386Z',
    '2020-07-10T14:43:26.374Z',
    '2020-04-25T18:49:59.371Z',
    '2020-02-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Bruce Lee',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-02-01T13:15:33.035Z',
    '2021-01-30T09:48:16.867Z',
    '2021-04-25T06:04:23.907Z',
    '2020-09-25T14:18:46.235Z',
    '2020-07-05T16:33:06.386Z',
    '2020-11-10T14:43:26.374Z',
    '2020-12-25T18:49:59.371Z',
    '2020-08-26T12:01:20.894Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let wellcomeUserByTime = new Date();
let hours = wellcomeUserByTime.getHours();
let minutes = wellcomeUserByTime.getMinutes();
let date = wellcomeUserByTime.getDate();
let month = wellcomeUserByTime.getMonth() + 1;
let year = wellcomeUserByTime.getFullYear();
let seconds = wellcomeUserByTime.getSeconds();

let counterOperations = 0;
let amountOfTheOwner = 0;
let calendarDate = 0;
let localTime = 0;
let switcherCalls = true;

const timeAndDateNow = () => {
  if (date < 10) {
    date = '0' + date;
  }
  if (month < 10) {
    month = '0' + month;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  calendarDate = `${date}/${month}/${year}`;
  localTime = `${hours}:${minutes}`;
  labelDate.append(`${calendarDate}, ${localTime}`);
};
timeAndDateNow();

let theDay = '';
let cycleDaysDeposit = 0;

let todayYesterday = () => {
  if (cycleDaysDeposit === 1) {
    theDay = 'Yesterday';
  } else if (cycleDaysDeposit === 0) {
    theDay = 'Today';
  } else {
    theDay = cycleDaysDeposit + ' Days ago';
  }
};
const cycleLoadAmounts = () => {
  containerMovements.innerHTML = '';
  daysAgo();
  for (let i = amountOfTheOwner.length - 1; i >= 0; i--) {
    if (amountOfTheOwner[i] < 0) {
      let cycleDaysWithdraw = arrWithdrawDates.shift();
      let elementWithdraw = `<div class="movements__row">
<div class="movements__type movements__type--withdrawal">
${i + 1} Withdraw
</div>
<div class="movements__date">${cycleDaysWithdraw}</div>
<div class="movements__value">${amountOfTheOwner[i]}€</div>
</div>`;
      containerMovements.innerHTML += elementWithdraw;
    } else {
      cycleDaysDeposit = arrDepositsDaysAgo.shift();
      todayYesterday();
      let elementDeposit = `<div class="movements__row">
<div class="movements__type movements__type--deposit">${i + 1} deposit</div>
<div class="movements__date">${theDay}</div>
<div class="movements__value">${amountOfTheOwner[i]}€</div>
</div>`;
      containerMovements.innerHTML += elementDeposit;
    }
    counterOperations += 1;
  }
};

const checkLogins = () => {
  let checkLogBoolFlag = false;
  for (const account of accounts) {
    let owner = account.owner;
    let pin = account.pin;
    amountOfTheOwner = account.movements;
    const welcomeMessage = () => {
      if (hours < 12 && hours > 6) {
        labelWelcome.textContent = `${owner}, Good Morning`;
      } else if (hours > 12 && hours < 20) {
        labelWelcome.textContent = `${owner}, Good Afternoon`;
      } else {
        labelWelcome.textContent = `${owner}, Good Evening`;
      }
    };
    if (
      inputLoginUsername.value === owner &&
      Number(inputLoginPin.value) === pin
    ) {
      cycleLoadAmounts();
      containerApp.style.opacity = '1';
      welcomeMessage();
      checkLogBoolFlag = true;
      break;
    }
  }
  if (checkLogBoolFlag === false) {
    alert('Wrong Username/Password !\n Please try again !');
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
  }
};

btnLogin.addEventListener('click', function (e) {
  labelSumOut.innerHTML = '';
  labelSumIn.innerHTML = '';
  neggativeTransactionsContainer = 0;
  possitiveTransactionsContainer = 0;
  e.preventDefault();
  checkLogins();
  resetTimer();
  countDownTime();
  loadTransactions();
  sum();
  interestCalculate();
});

let requestLoan = () => {
  let amountDeposit = Number(parseFloat(inputLoanAmount.value).toFixed(2));
  pushLoanSum();
  counterOperations += 1;
  let elementDeposit = `<div class="movements__row">
  <div class="movements__type movements__type--deposit">${counterOperations} deposit</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${amountDeposit}€</div>
</div>`;
  containerMovements.innerHTML += elementDeposit;
  cycleLoadAmounts();
};

let transfer = () => {
  let amountTransfer = -Number(
    parseFloat(inputTransferAmount.value).toFixed(2)
  );
  counterOperations += 1;
  let elementWithdraw = `<div class="movements__row">
<div class="movements__type movements__type--withdrawal">
  ${counterOperations} Withdraw
</div>
<div class="movements__date">${calendarDate}</div>
<div class="movements__value">${amountTransfer}€</div>
</div>`;
  containerMovements.innerHTML += elementWithdraw;
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  requestLoan();
  clearInputsAfterLoad();
  sum();
  interestCalculate();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  if (parseFloat(labelBalance.innerText) >= inputTransferAmount.value) {
    transfer();
    usernameTransfer();
    cycleLoadAmounts();
    pushWithdrawSum();
    clearInputsAfterLoad();
    sum();
  } else {
    alert('You dont have enough balance for this transaction !');
    inputTransferAmount.value = '';
  }
});

const usernameTransfer = () => {
  let inputName = inputTransferTo.value;
  let amountTransfer = Number(parseFloat(inputTransferAmount.value).toFixed(2));
  for (const account of accounts) {
    if (inputName === account.owner) {
      account.movements.push(amountTransfer);
    }
    if (inputLoginUsername.value === account.owner) {
      account.movements.push(-amountTransfer);
    }
  }
};

const clearInputsAfterLoad = () => {
  inputTransferTo.value = '';
  inputLoanAmount.value = '';
  inputTransferAmount.value = '';
};

let time;
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  time = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      timer = duration;
      containerApp.style.opacity = 0;
    }
  }, 1000);
}

let countDownTime = function () {
  let tenMinutes = 60 * 10,
    display = labelTimer;
  startTimer(tenMinutes, display);
};

function resetTimer() {
  clearInterval(time);
  labelTimer.innerHTML = '';
}

let possitiveTransactionsContainer = 0;
let neggativeTransactionsContainer = 0;

const loadTransactions = () => {
  for (const account of accounts) {
    if (inputLoginUsername.value === account.owner) {
      for (let i = 0; i < account.movements.length; i++) {
        if (account.movements[i] > 0) {
          possitiveTransactionsContainer += Number(account.movements[i]);
        } else {
          neggativeTransactionsContainer += Number(account.movements[i]);
        }
      }
      labelSumIn.innerHTML = possitiveTransactionsContainer.toFixed(2) + '€';
      labelSumOut.innerHTML = neggativeTransactionsContainer.toFixed(2) + '€';
    }
  }
};

const pushLoanSum = () => {
  for (const account of accounts) {
    if (inputLoginUsername.value === account.owner) {
      account.movements.push(
        Number(parseFloat(inputLoanAmount.value).toFixed(2))
      );
      possitiveTransactionsContainer += Number(
        parseFloat(inputLoanAmount.value).toFixed(2)
      );
      labelSumIn.innerHTML = possitiveTransactionsContainer.toFixed(2) + '€';
    }
  }
};

const pushWithdrawSum = () => {
  for (const account of accounts) {
    if (inputTransferTo.value === account.owner) {
      neggativeTransactionsContainer -= Number(
        parseFloat(inputTransferAmount.value).toFixed(2)
      );
      labelSumOut.innerHTML = neggativeTransactionsContainer.toFixed(2) + '€';
    }
  }
};

let sum = () => {
  let result = (
    possitiveTransactionsContainer + neggativeTransactionsContainer
  ).toFixed(2);
  labelBalance.innerHTML = result + '€';
};

let interestCalculate = () => {
  for (const account of accounts) {
    if (account.owner === inputLoginUsername.value) {
      let result = Number(
        (account.interestRate * possitiveTransactionsContainer) / 100
      ).toFixed(2);
      labelSumInterest.innerHTML = result + '€';
    }
  }
};

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  closeAcc();
});

const closeAcc = () => {
  for (const account of accounts) {
    if (
      account.owner === inputCloseUsername.value &&
      account.pin == inputClosePin.value
    ) {
      delete account.owner;
      containerApp.style.opacity = 0;
    }
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
};

const sortingPossitive = () => {
  for (const account of accounts) {
    if (account.owner === inputLoginUsername.value) {
      const filtered = account.movements.filter(element => element > 0);
      const sorted = filtered.sort(function (a, b) {
        return b - a;
      });
      return sorted;
    }
  }
};

const sortingNegative = () => {
  for (const account of accounts) {
    if (account.owner === inputLoginUsername.value) {
      const filteredNeg = account.movements.filter(element => element < 0);
      const sortedNeg = filteredNeg.sort(function (a, b) {
        return b - a;
      });
      return sortedNeg;
    }
  }
};

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortingPossitive();
  sortingNegative();
  counterOperations = 0;
  const connectWithAndPosArrays = sortingPossitive().concat(sortingNegative());
  connectWithAndPosArrays.reverse();

  const loadSorting = () => {
    containerMovements.innerHTML = '';
    daysAgo();
    for (let i = connectWithAndPosArrays.length - 1; i >= 0; i--) {
      if (connectWithAndPosArrays[i] < 0) {
        let cycleDaysWithdraw = arrWithdrawDates.shift();
        let elementWithdraw = `<div class="movements__row">
<div class="movements__type movements__type--withdrawal">
${i + 1} Withdraw
</div>
<div class="movements__date">${cycleDaysWithdraw}</div>
<div class="movements__value">${connectWithAndPosArrays[i]}€</div>
</div>`;
        containerMovements.innerHTML += elementWithdraw;
      } else {
        cycleDaysDeposit = arrDepositsDaysAgo.shift();
        todayYesterday();
        let elementDeposit = `<div class="movements__row">
<div class="movements__type movements__type--deposit">${i + 1} deposit</div>
<div class="movements__date">${theDay}</div>
<div class="movements__value">${connectWithAndPosArrays[i]}€</div>
</div>`;
        containerMovements.innerHTML += elementDeposit;
      }
      counterOperations += 1;
    }
  };
  function call() {
    if (switcherCalls) loadSorting();
    else cycleLoadAmounts();
    switcherCalls = !switcherCalls;
  }
  call();
});

let arrDepositsDaysAgo = [];
let arrWithdrawDates = [];
let datesLoad = [];

const daysAgo = () => {
  var date1, date2;
  for (const account of accounts) {
    if (account.owner === inputLoginUsername.value) {
      datesLoad = account.movementsDates;
      for (let i = datesLoad.length - 1; i >= 0; i--) {
        //define two date object variables with dates inside it
        date1 = new Date(wellcomeUserByTime);
        date2 = new Date(datesLoad[i]);
        //calculate time difference
        var time_difference = date2.getTime() - date1.getTime();
        //calculate days difference by dividing total milliseconds in a day
        let days_difference = Math.abs(
          Math.round(time_difference / (1000 * 60 * 60 * 24))
        );
        // return days_difference;
        if (account.movements[i] > 0) {
          arrDepositsDaysAgo.push(days_difference);
        } else if (
          account.movements[i] < 0 &&
          account.movements[i] !== account.movements[i + 1]
        ) {
          let day = date2.getUTCDate();
          let month = date2.getUTCMonth() + 1;
          let year = date2.getUTCFullYear();
          let visualLookDate = day + '/' + month + '/' + year;
          arrWithdrawDates.push(visualLookDate);
          datesLoad.push(date1);
        }
      }
      datesLoad = [];
    }
  }
};
