const tabOne = document.querySelector(".react");
const tabTwo = document.querySelector(".vue");
const tabThree = document.querySelector(".angular");
const body = document.body;
const item = document.querySelector(".item");
const icon = document.querySelector(".big-icon");
const active = document.querySelector(".active");

function setColors(tab, bgColor, iconClass, infoColor){
  body.style.backgroundColor = bgColor;
  icon.innerHTML = '<i class = "${iconClass}">';
  for(let i = 0; i < item.length; i++ ){
    item[i].style.color = infoColor;
  }
}

tabOne.addEventListener("click", () => {
  setColors(tabOne, "#00d8ff", "fab fab-react", "#00d8ff");
  tabOne.classList.add("tabOne");
  tabTwo.classList.remove("tabOne");
  tabThree.classList.remove("tabOne");
});


setColors(tabOne, "#00d8ff", "fab fab-react", "#00d8ff");
tabOne.classList.add(tabOne);
