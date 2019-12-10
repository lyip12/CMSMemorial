responsivemap();

function responsivemap(){

    var w = window.innerWidth;
    var maptop = -w*2/3-15;
    document.getElementById('responsive-map').style.marginTop = maptop + "px";
}

$('label').click( function() {
    $(this).removeClass('btn-light').addClass('btn-dark').siblings().addClass('btn-light');
});


function settimeframeA(){
    var values = [1600, 1850];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1780 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeB(){
    var values = [1850, 1870];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1850 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeC(){
    var values = [1870, 1900];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1870 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeD(){
    var values = [1900, 1930];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1900 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeE(){
    var values = [1930, 1950];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1930 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeF(){
    var values = [1950, 1970];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1950 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeG(){
    var values = [1970, 2013];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1970 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

function settimeframeH(){
    var values = [2013, 2019];
    document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 2013 + mapbackgroundfinish;
    responsivemap();
    $("#label-0").css('left', (values[0]-1600)/419*97 + "%").text(values[0]);
    $("#label-1").css('left', (values[1]-1600)/419*97 + "%").text(values[1]);
    var selectcategory = $("input[name='category']:checked").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    updatemap(values[0], values[1], selectcategory, selecttype, selectstatus, selecttime);
    updateslider(values);
}

// Get the modal

function updateImage(){
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        console.log("itsworking")
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
    var spann = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    spann.onclick = function() { 
        modal.style.display = "none";
    }
}

function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
