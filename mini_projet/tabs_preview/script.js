const tabOne = document.querySelector(".react");
const tabTwo = document.querySelector(".vue");
const tabThree = document.querySelector(".angular");
const body = document.body;
const items = document.querySelectorAll(".item");
const icon = document.querySelector(".big-icon");

function setColors(bgColor, iconClass, infoColor){
  body.style.backgroundColor = bgColor;
  icon.className = iconClass;
  items.forEach(item => {
    item.style.color = infoColor;
  });
}

tabOne.addEventListener("click", () => {
  setColors("#00d8ff", "fab fa-react", "#00d8ff");
  tabOne.classList.add("tabOne");
  tabTwo.classList.remove("tabTwo");
  tabThree.classList.remove("tabThree");
});

tabTwo.addEventListener("click", () => {
  setColors("#42b883", "fab fa-vuejs", "#42b883");
  tabTwo.classList.add("tabTwo");
  tabOne.classList.remove("tabOne");
  tabThree.classList.remove("tabThree");
});

tabThree.addEventListener("click", () => {
  setColors("#b52e31", "fab fa-angular", "#b52e31");
  tabThree.classList.add("tabThree");
  tabTwo.classList.remove("tabTwo");
  tabOne.classList.remove("tabOne");
});

setColors("#00d8ff", "fab fa-react", "#00d8ff");
tabOne.classList.add("tabOne");
