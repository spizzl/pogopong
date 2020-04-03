class UserDialog {

  constructor() {
    $( document ).ready(function() {

      console.log( "skrr!" );

      this.background = $('.mainview')
      this.mainpopup = $('.mainpopup')
      this.mainpopupcontainer = $('.popupcontainer')
      this.notifications = $('.dialogpopup')
    })
  }


  opendialog(dialog, html) {
  $( document ).ready(function() {
    if (dialog == 'main') {
      this.mainpopup[0].style.display = "block"
      this.background[0].style.opacity = 0.3
      this.mainpopupcontainer.load(html)
    } else if (dialog == 'notification') {
      //Kommt noch
    }
  })
  }

  closedialog(dialog) {
    $( document ).ready(function() {

    if (dialog == 'main') {
      this.mainpopup[0].style.display = "none"
      this.background[0].style.opacity = 1
      this.mainpopupcontainer.empty()
    } else if (dialog == 'notification') {
      this.notifications[0].style.display = 'none'
    }
  }
  )}
}
