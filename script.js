const cells = 31;


// From 0.001 to 100
const items = [
  {name: 'Vkinka', img: 'IMG/case/ecig.svg', chance: 1},
  {name: 'cigone', img: 'IMG/case/caliber.png', chance: 2},
  {name: 'xylinet', img: 'IMG/case/tshirt.svg', chance: 3},
  {name: 'Pika', img: 'IMG/case/pod.svg', chance: 4},
  {name: '1500ballov', img: 'IMG/case/bohkazip.png', chance: 5},
  {name: '1500ballov', img: 'IMG/case/boshkijar.png', chance: 6},
  {name: 'achonet', img: 'IMG/case/1try.svg', chance: 10},
  {name: '100ballov', img: 'IMG/case/5percent.svg', chance: 25},
  {name: '50ballov', img: 'IMG/case/dontcry.svg', chance: 28}
];


// const items = [
//     {name: 'Pika', img: 'IMG/case/pika.png', chance: 6},
//     {name: 'cigone', img: 'IMG/case/cigone.png', chance: 8},
//     {name: 'Vkinka', img: 'IMG/case/snusik.png', chance: 10},
//     {name: 'xylinet', img: 'IMG/case/xylinet.png', chance: 7},
//     {name: '100ballov', img: 'IMG/case/100ballov.png', chance: 20},
//     {name: 'lose', img: 'IMG/case/lose.png', chance: 20},
//     {name: '1500ballov', img: 'IMG/case/1500ballov.png', chance: 1},
//     {name: '50ballov', img: 'IMG/case/50ballov.png', chance: 25},
//     {name: 'achonet', img: 'IMG/case/achonet.png', chance: 11}


function getItem() {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 1000);

    items.forEach((elm) => {
      if (chance < elm.chance && !item) item = elm;
    });
  }

  return item;
}

function generateItems() {
  document.querySelector(".list").remove();
  document.querySelector(".scope").innerHTML = `
    <ul class="list"></ul>
  `;

  const list = document.querySelector(".list");

  for (let i = 0; i < cells; i++) {
    const item = getItem();

    const li = document.createElement("li");
    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `
      <img src="${item.img}" alt="" />
    `;

    list.append(li);
  }
}

generateItems();

let isStarted = false;
let isFirstStart = true;

function start() {
  // if (getCookie("attempt").includes("played")) {
  //   console.log(getCookie("attempt"));
  //   return;
  // }

  if (isStarted) return;
  else isStarted = true;

  if (!isFirstStart) generateItems();
  else isFirstStart = false;
  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  const item = list.querySelectorAll("li")[15];

  list.addEventListener(
    "transitionend",
    () => {
      isStarted = false;
      item.classList.add("active");
      const data = JSON.parse(item.getAttribute("data-item"));
      
      let response = fetch('./google-sheets/index.php', {
          method: 'POST',
          body: JSON.stringify(data)
      });
      
      console.log(data);
      confetti.render();
    },
    { once: true }
  );

  document.getElementById("start-button").style.background = "#ffffff1c";
  document.getElementById("start-button").style.cursor = "not-allowed";
  document.getElementById("start-button").disabled = true;

  // Confetti
  var confettiSettings = { target: "confetti" };
  var confetti = new ConfettiGenerator(confettiSettings);

  setTimeout(() => {
    document.getElementById("start-button").style.background = "#7867B1";
    document.getElementById("start-button").style.cursor = "pointer";
    document.getElementById("start-button").disabled = false;
    confetti.clear();
  }, 20 * 1000);

  setTimeout(() => {
    // document.getElementById("confetti").style.zIndex = "100000";
  }, 4700);
}

