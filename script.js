async function getVehicles() {
  try {
    const response = await axios.get("https://swapi.dev/api/vehicles/");
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

async function randomVehicle(placeholder) {
  const vehicleArray = await getVehicles();
  return vehicleArray[placeholder];
  //   const randomIndex = Math.floor(Math.random() * 10);
  //   return vehicleArray[randomIndex];
}

randomVehicle();

async function renderCard() {
  const card1 = document.querySelector(".option__button--a");
  const a = Math.floor(Math.random() * 4) + 1;
  const resultA = await randomVehicle(a);
  card1.textContent = resultA.name;
  const vehicleA = resultA.name;

  const card2 = document.querySelector(".option__button--b");
  const b = Math.floor(Math.random() * 5) + 4;
  const resultB = await randomVehicle(b);
  card2.textContent = resultB.name;
  const vehicleB = resultB.name;

  //   while (vehicleA === vehicleB) {
  //     resultB = await randomVehicle();
  //     card2.textContent = resultB.name;
  //     vehicleB = resultB.name;
  //   }

  const cardImageA = document.querySelector(".card__image--a");
  const cardImageB = document.querySelector(".card__image--b");
  cardImageA.setAttribute(
    "src",
    `./assets/images/${vehicleA.replace(/\//g, " ")}.jpeg`
  );
  cardImageB.setAttribute(
    "src",
    `./assets/images/${vehicleB.replace(/\//g, " ")}.jpeg`
  );

  const vehicleASpeed = resultA.max_atmosphering_speed;
  console.log(vehicleASpeed);

  const vehicleBSpeed = resultB.max_atmosphering_speed;
  console.log(vehicleBSpeed);

  const speeds = [
    {
      name: vehicleA,
      speed: vehicleASpeed,
    },
    {
      name: vehicleB,
      speed: vehicleBSpeed,
    },
  ];
  return speeds;
}

async function checkAnswer() {
  const vehicleSpeeds = await renderCard();
  let answer;
  if (Number(vehicleSpeeds[0].speed) > Number(vehicleSpeeds[1].speed)) {
    answer = vehicleSpeeds[0].name;
  } else {
    answer = vehicleSpeeds[1].name;
  }

  const buttonA = document.querySelector(".option__button--a");
  const buttonB = document.querySelector(".option__button--b");
  const answerText = document.querySelector(".answer__text");

  buttonA.addEventListener("click", (event) => {
    const correctClass = document.querySelector(".answer__text--correct");
    const incorrectClass = document.querySelector(".answer__text--incorrect");
    if (correctClass) {
      answerText.classList.remove("answer__text--correct");
    }
    if (incorrectClass) {
      answerText.classList.remove("answer__text--incorrect");
    }

    // console.log(rightAnswer());
    if (event.target.textContent === answer) {
      answerText.textContent = "Correct! 🔥  May the force be with you";
      answerText.classList.add("answer__text--correct");
    } else {
      answerText.textContent = "Wrong! ☠️ Best luck next time";
      answerText.classList.add("answer__text--incorrect");
    }
  });

  buttonB.addEventListener("click", (event) => {
    const correctClass = document.querySelector(".answer__text--correct");
    const incorrectClass = document.querySelector(".answer__text--incorrect");
    if (correctClass) {
      answerText.classList.remove("answer__text--correct");
    }
    if (incorrectClass) {
      answerText.classList.remove("answer__text--incorrect");
    }
    // console.log(rightAnswer());
    if (event.target.textContent === answer) {
      answerText.textContent = "Correct! 🔥 May the force be with you";
      answerText.classList.add("answer__text--correct");
    } else {
      answerText.textContent = "Wrong! ☠️ Best luck next time";
      answerText.classList.add("answer__text--incorrect");
    }
  });
}
checkAnswer();

const tryAgain = document.querySelector(".againButton");
tryAgain.addEventListener("click", () => {
  location.reload();
});
