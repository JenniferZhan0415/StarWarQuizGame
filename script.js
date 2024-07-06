/** Global Variables */
const vehicles = {
  A: {
    name: "",
    speed: 0,
  },
  B: {
    name: "",
    speed: 0,
  },
};

/** API Calls */

/**
 * Fetch all vehicles from the API.
 *
 * @returns API results
 */
async function getAllVehicles() {
  try {
    const response = await axios.get("https://swapi.dev/api/vehicles/");
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

/** Vehicles */

/**
 * Select a random vehicle.
 *
 * @returns A random vehicle
 */
const randomVehicle = (allVehicles) => {
  const index = Math.floor(Math.random() * allVehicles.length);
  return allVehicles[index];
};

/**
 * Select two random vehicles and save to global scope.
 */
const getRandomVehicles = (allVehicles) => {
  // get two random vehicles
  const vehicleA = randomVehicle(allVehicles);
  let vehicleB = randomVehicle(allVehicles);
  while (vehicleA.name === vehicleB.name) vehicleB = randomVehicle(vehicles);

  vehicles.A.name = vehicleA.name;
  vehicles.B.name = vehicleB.name;
  vehicles.A.speed = parseInt(vehicleA.max_atmosphering_speed);
  vehicles.B.speed = parseInt(vehicleB.max_atmosphering_speed);
};

/**
 * Display two randomly selected vehicles.
 */
const renderVehicles = () => {
  const card1 = document.querySelector(".option__button--a");
  const card2 = document.querySelector(".option__button--b");
  card1.textContent = vehicles.A.name;
  card2.textContent = vehicles.B.name;

  const cardImageA = document.querySelector(".card__image--a");
  const cardImageB = document.querySelector(".card__image--b");
  cardImageA.setAttribute(
    "src",
    `./assets/images/${vehicles.A.name.replace(/\//g, " ")}.jpeg`
  );
  cardImageB.setAttribute(
    "src",
    `./assets/images/${vehicles.B.name.replace(/\//g, " ")}.jpeg`
  );
};

/** Check Answer */

/**
 * Check if user's answer is correct or not and render messages accordingly.
 *
 * @param {String} vehicle The answer user selected.
 */

// let { nameA, speedA } = vehicles[0];
// let { nameB, speedB } = vehicles[1];

const checkAnswer = (vehicle) => {
  const userAnswer = Object.values(vehicles).filter(
    (v) => v.name === vehicle
  )[0].speed;

  console.log(vehicles.A.speed, vehicles.B.speed);
  const correct = userAnswer === Math.max(vehicles.A.speed, vehicles.B.speed);

  const answerText = document.querySelector(".answer__text");
  if (correct) {
    answerText.textContent = `Correct! 🔥 ${vehicle} is faster! It max speed is ${userAnswer}. May the force be with you!`;
    answerText.classList.remove("answer__text--incorrect");
    answerText.classList.add("answer__text--correct");
  } else {
    answerText.textContent = `Wrong! ☠️ ${vehicle}'s max speed is ${userAnswer}. Best luck next time!`;
    answerText.classList.remove("answer__text--correct");
    answerText.classList.add("answer__text--incorrect");
  }
};

/** HTML/Attach event listeners */
const buttonA = document.querySelector(".option__button--a");
const buttonB = document.querySelector(".option__button--b");

buttonA.addEventListener("click", () => checkAnswer(buttonA.textContent));
buttonB.addEventListener("click", () => checkAnswer(buttonB.textContent));

const tryAgain = document.querySelector(".againButton");
tryAgain.addEventListener("click", () => {
  location.reload();
});

/** Entrypoint */
const main = async () => {
  // download all vehicles through SW API
  const allVehicles = await getAllVehicles();
  // select two vehicles randomly
  getRandomVehicles(allVehicles);
  // display vehicles
  renderVehicles();
};

main();
