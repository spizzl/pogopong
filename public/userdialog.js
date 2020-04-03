class UserdDialog {

  constructor() {
    this.background = document.getElementsByClassName('underpopup')[0]
    this.mainpopup = document.getElementsByClassName('underpopup')[0]
    this.notifications = document.getElementsByClassName('underpopup')[0]
  }


  function opendialog(dialog, html){
    document.getElementsByClassName('popup')[0].style.display = "block";
    .style.opacity = 0.4;

  }

  function closedialog(){
    document.getElementsByClassName('popup')[0].style.display = "none";
    document.getElementsByClassName('underpopup')[0].style.opacity = 1;
  }

}
