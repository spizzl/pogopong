
function opendialog(){


  document.getElementsByClassName('popup')[0].style.display = "block";
  document.getElementsByClassName('underpopup')[0].style.opacity = 0.4;

}

function closedialog(){
  document.getElementsByClassName('popup')[0].style.display = "none";
  document.getElementsByClassName('underpopup')[0].style.opacity = 1;
}
