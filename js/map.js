var start = 1600;
var end = 2019;
var selectcategory = "all",
    selecttype  = "all",
    selectstatus = "all",
    selecttime = "yes";


//https://jqueryui.com/slider/#range
updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);


$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 1600,
        max: 2019,
        values: [ 1600, 2019 ],
        slide: function( event, ui ) {
            $( "#range" ).val( ui.values[0] + " - " + ui.values[1] );
            start = ui.values[0];
            end = ui.values[1];


            var selectcategory = $("input[name='category']:checked").val();
            var selecttype = $("input[name='type']:checked").val();
            var selectstatus = $("input[name='status']:checked").val();
            var selecttime= $("input[name='time']:checked").val();
            updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);
        }
    });
    $( "#range" ).val($( "#slider-range" ).slider( "values", 0 ) +
                      " - " + $( "#slider-range" ).slider( "values", 1 ) );
} );


$("#categoryfilter").click(function () {
    var selectcategory = $("input[name='category']:hover").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    //console.log(yipchoroselector);
    if (selectcategory !== undefined && selectcategory !== "NA") {
        updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);
    };
});

$("#typefilter").click(function () {
    var selecttype = $("input[name='type']:hover").val();
    var selectcategory = $("input[name='category']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    //console.log(yipchoroselector);
    if (selecttype !== undefined && selecttype !== "NA") {
        updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);
    };
});

$("#statusfilter").click(function () {
    var selectstatus = $("input[name='status']:hover").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectcategory = $("input[name='category']:checked").val();
    var selecttime= $("input[name='time']:checked").val();
    //console.log(yipchoroselector);
    if (selectstatus !== undefined && selectstatus !== "NA") {
        updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);
    };
});

$("#timefilter").click(function () {
    var selecttime= $("input[name='time']:hover").val();
    var selecttype = $("input[name='type']:checked").val();
    var selectstatus = $("input[name='status']:checked").val();
    var selectcategory = $("input[name='category']:checked").val();
    //console.log(yipchoroselector);
    if (selecttime !== undefined && selecttime !== "NA") {
        updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);
    };
});


//d3.select("#category").on("change", function () {
//    updatemap(start, end);
//});
//d3.select("#type").on("change", function () {
//    updatemap(start, end);
//});
//d3.select("#status").on("change", function () {
//    updatemap(start, end);
//});


function updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime){

    d3.selectAll("path").remove();

    //    var selectcategory = d3.select("#category").property("value");
    //    var selecttype = d3.select("#type").property("value");
    //    var selectstatus = d3.select("#status").property("value");

    //console.log(raw_json.features);

    console.log(selectcategory + ", " +
                selecttype + ", " +
                selectstatus + ", " +
                selecttime);

    var categoryfilter = raw_json.features.filter(function(d) { 
        if(selectcategory !== "all"){
            return d.Category == selectcategory; 
        } else {
            return raw_json.features
        }
    })

    var typefilter = categoryfilter.filter(function(d) { 
        if(selecttype !== "all"){
            return d.Type == selecttype; 
        } else {
            return categoryfilter;
        }
    })



    var statusfilter = typefilter.filter(function(d) { 
        if(selectstatus !== "all"){
            return d.Status == selectstatus; 
        } else {
            return typefilter;
        }
    })

    var timefilter = statusfilter.filter(function(d) { 
        if(selecttime == "yes"){
            return (d.YearMonumentalized >= start && d.YearMonumentalized <= end) || d.YearMonumentalized == "";
        } else {
            return d.YearMonumentalized >= start && d.YearMonumentalized <= end;
        };
    })
    
    
    var finalfilter = timefilter.sort( function(a, b){ 
        return a.Gender - b.Gender;
    });

    // console.log(end);
    //            
    //    var filtereddata = raw_json.features.filter(function(d) { 
    //        return d.features.Ownership == "unknown"; 
    //    });

    var toggle;
    //Tooltip
    var Tooltip = d3.select("#map")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "3px")
    .style("color", "#ff8003")
    .style("font-size", "14px")
    .style("padding", "3px")

    let mouseOver = function(d) {
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "#ff8003")
            .style("stroke", "#ff8003")
            .style("opacity", 1)


        var mapbackgroundstart = "<img src='assets/image/map";
        var mapbackgroundfinish = ".jpg' id='responsive-map' alt='old boston map'>";
        //console.log(mapbackgroundstart + 2013 + mapbackgroundfinish)
        if(d.YearMonumentalized <= 1850 && d.YearMonumentalized !== ""){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1780 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 2013 && d.YearMonumentalized > 1970){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1970 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 1970 && d.YearMonumentalized > 1950){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1950 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 1950 && d.YearMonumentalized > 1930){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1930 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 1930 && d.YearMonumentalized > 1900){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1900 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 1900 && d.YearMonumentalized > 1870){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1870 + mapbackgroundfinish;
            responsivemap();
        } else if (d.YearMonumentalized <= 1870 && d.YearMonumentalized > 1850){
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 1850 + mapbackgroundfinish;
            responsivemap();
        } else {
            document.getElementById("mapbackground").innerHTML = mapbackgroundstart + 2013 + mapbackgroundfinish;
            responsivemap();
        };




        if((d.Gender) !== ""){ var gender = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>gender</button>"} else { var gender = ""};
        if((d.Ethnicity) !== ""){ var ethnicity = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>ethnicity</button>"} else { var ethnicity = ""};
        if((d.Controversy) !== ""){ var contro = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>controversy</button>"} else { var contro = ""};
        if((d.Vandalized) !== ""){ var van = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>vandalized</button>"} else { var van = ""};

        tip = d.Name + gender + ethnicity + contro + van;

        Tooltip
            .html(tip)
            .style("left", (d3.mouse(this)[0]*0.98-150) + "px")
            .style("top", (d3.mouse(this)[1])*0.85-80 + "px")
            .transition()
            .duration(300)
            .style("opacity", 1);
    }

    let mouseLeave = function(d) {
        d3.select(this)
            .transition()
            .duration(300)
            .style("fill", "#ffffff")  

        Tooltip
            .style("opacity", 1)
            .transition()
            .duration(300)
            .style("opacity", 0)
    }

    let mouseClick = function (d) {
        d3.select(this)
            .transition()
            .duration(800)
            .style("fill", "#ffc48a")
            .attr("stroke", "#ffffff")
            .style("opacity", 1)

        tip = "this is the tooltip after mouseclick";

        Tooltip
            .html(tip)
            .style("left", (d3.mouse(this)[0]*2) + "px")
            .style("top", (d3.mouse(this)[1]*2.5) + "px")
            .transition()
            .duration(300)
            .style("opacity", 1);


        if((d.Gender) !== ""){ var g = "Gender: "+d.Gender+"<br>"} else { var g = ""};
        if((d.Ethnicity) !== ""){ var e = "Ethnicity: " + d.Ethnicity} else { var e = ""};
        if((d.Controversy) !== ""){ var c = "Controversy: " + d.Controversy} else { var c = ""};
        if((d.Vandalized) !== ""){ var v = "Vandalized: " + d.Vandalized} else { var v = ""};
        var special = g+e+c+v;
        var sr = "";

        if(special !==""){
            var sr = "<b style='color: red !important;'>Special Record:<br>" + special + "</b><br><br>";
        } else {
            var sr = "Special Record: none <br><br>";
        }

        var t = "<h5>" + d.Name + "</h5>"
        + "<p>built in " + d.YearMonumentalized + "<br><br>" 
        + "<b>Address:</b><br>"
        + d.AddressNum + " " + d.Street + "<br>"
        + "Boston, " + d.State + "<br>"
        + d.Zipcode + "<br><br>"
        + "<b>Record Category: </b>" + d.Category+"<br>"
        + "<b>Establishment Type: </b>" + d.Type+"<br>"
        + "<b>Current Status: </b>" + d.Status+"<br><br>"
        + sr
        + d.Comments + "</p>"
        + "<img src='assets/dataimg/"+d.ID+"_01.jpg' class='responsive-image'>"
        + "<p>Entry ID: "+d.ID+" - <a href="+d.Source+">Source of Data Entry</a></p>";

        document.getElementById("maptext").innerHTML = t;
    }


    var svg = d3.select("#map")
    .classed("svg-container", true) 
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 1000")
    .classed("svg-content-responsive", true);

    var path = d3.geoPath();


    var albersProjection = d3.geoAlbers()
    .scale(700000)
    .rotate( [71.057,0] )
    .center( [0, 42.4] )
    .translate([680,-100]);

    var geoPath = d3.geoPath()
    .projection( albersProjection );

    var g = svg.selectAll("path")
    .remove()
    .exit()
    .data(neighborhoods_json.features)

    g.enter()
        .append("path")
        .data(neighborhoods_json.features )
        .attr( "fill", "#736a60" )
        .attr("opacity", 0.2)
        .attr("stroke-width", 1)
        .attr( "stroke", "#CFC3B8")
        .attr( "d", geoPath );

    var raw = svg.append("g");

    //console.log(statusfilter);


    raw.selectAll("path")
        .data(finalfilter)
        .enter()
        .append( "path" )
        .attr( "fill", function(d){
        if(d.Gender == "female"){
            return "#ff8e4d";
        } else if (d.Gender == "male"){
            return "#9fe0df";
        } else if (d.Gender == ""){
            return "white";
        } else {
            return "white";
        }
    })
        .attr( "opacity", 0.8 )
        .attr("stroke-width", function(d){
        if(d.Gender == "female"){
            return 10;
        } else if (d.Gender == "male"){
            return 2;
        } else if (d.Gender == ""){
            return 0.01;
        } else {
            return 0.01;
        }
    })
        .attr( "stroke", function(d){
        if(d.Gender == "female"){
            return "#ff8e4d";
        } else if (d.Gender == "male"){
            return "#9fe0df";
        } else if (d.Gender == ""){
            return "white";
        } else {
            return "white";
        }
    })
        .attr( "d", geoPath)
        .on("click", mouseClick)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)

};
