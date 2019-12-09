responsivemap();

function responsivemap(){

    var w = window.innerWidth;
    var maptop = -w*2/3-15;
    document.getElementById('responsive-map').style.marginTop = maptop + "px";
}

$('label').click( function() {
  $(this).removeClass('btn-light').addClass('btn-dark').siblings().addClass('btn-light');
});