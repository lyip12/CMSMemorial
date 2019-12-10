var start = 1600;
var end = 2019;
var selectcategory = "all",
    selecttype  = "all",
    selectstatus = "all",
    selecttime = "yes";

var values = [1600, 2019];

var mapbackgroundstart = "<img src='assets/image/map";
var mapbackgroundfinish = ".png' id='responsive-map' alt='old boston map'>";

//https://jqueryui.com/slider/#range
updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);

updateslider(values);

function updateslider(v){
    //console.log(v);
    $( function() {
        $( "#slider" ).slider({
            range: true,
            min: 1600,
            max: 2019,
            values: v,
            slide: function( event, ui ) {
                //console.log(v);
                $( "#range" ).val( ui.values[0] + " - " + ui.values[1] );
                start = ui.values[0];
                end = ui.values[1];

                $("#label-0").css('left', ui.values[0] + "%").text(ui.values[0]);
                $("#label-1").css('left', ui.values[1] + "%").text(ui.values[1]);

                var selectcategory = $("input[name='category']:checked").val();
                var selecttype = $("input[name='type']:checked").val();
                var selectstatus = $("input[name='status']:checked").val();
                var selecttime= $("input[name='time']:checked").val();
                updatemap(start, end, selectcategory, selecttype, selectstatus, selecttime);

                $("#label-0").css('left', (start-1600)/419*98 + "%").text(start);
                $("#label-1").css('left', (end-1600)/419*98 + "%").text(end);
            },
            create: function(event, ui) {
                $("#label-0").css('left', (start-1600)/419*98 + "%").text(start);
                $("#label-1").css('left', (end-1600)/419*98 + "%").text(end);
            }
        }).trigger('slide');

    });

};

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
    .style("color", "black")
    .style("font-size", "14px")
    .style("padding", "3px")

    let mouseOver = function(d) {
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "#ff8003")
            .style("stroke", "#ff8003")
            .style("opacity", 1)

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

        if((d.Controversy) !== ""){ var contro = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>controversy</button>"} else { var contro = ""};
        if((d.Vandalized) !== ""){ var van = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>vandalized</button>"} else { var van = ""};

        tip = d.Name + contro + van;

        Tooltip
            .html(tip)
            .style("left", (d3.mouse(this)[0]*1.2-50) + "px")
            .style("top", (d3.mouse(this)[1]*1.2-50) + "px")
            .transition()
            .duration(300)
            .style("opacity", 1);
    }

    let mouseLeave = function(d) {
        d3.select(this)
            .transition()
            .duration(300)
            .style( "fill", function(d){
            if(d.Gender == "female"){
                return "#911a0a";
            } else if (d.Gender == "male"){
                return "#18545e";
            } else if (d.Gender == ""){
                return "white";
            } else {
                return "#7b428c";
            }
        }).style( "stroke", function(d){
        if(d.Gender == "female"){
            return "#911a0a";
        } else if (d.Gender == "male"){
            return "#18545e";
        } else if (d.Gender == ""){
            return "white";
        } else {
            return "#7b428c";
        }
    })

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
            .style("opacity", 0);


        if((d.Controversy) !== ""){ var c = "Controversy: " + d.Controversy} else { var c = ""};
        if((d.Vandalized) !== ""){ var v = "Vandalized: " + d.Vandalized} else { var v = ""};
        var special = c+v;
        var sr = "";

        if(special !==""){
            var sr = "<b style='color: orange;'>"+special + "</b><br><br>";
        } else {
            var sr = "<b style='color:black;'>Special Record:</b> none <br><br>";
        }

        var Category = d.Category || "<a>unknown category</a>";
        var Type = d.Type || "<a class='popup' onclick='popUp()'>unknown type<span class='popuptext' id='myPopup'>Enter Data: __ [submit]</a>";
        var Status = d.Status || "<a>unknown status</a>";

        var YearBuilt =  d.YearMonumentalized || "<a>unknown / undocumented</a>";
        var Ownership =  d.Ownership || "<a>unknown / undocumented</a>";
        var Gender = d.Gender || "<a>unknown / undocumented</a>";
        var Ethnicity = d.Ethnicity || "<a>unknown / undocumented</a>";

        if(d.AddressNum !== "" && d.Street !== ""){
            var Address = (d.AddressNum + " " + d.Street + ", Boston, MA" + d.Zipcode);
        } else {
            var Address = "<a>unknown, Boston, MA</a>";
        }

        var t = "<img id='myImg' src='assets/dataimg/"+d.ID+"_01.jpg' alt='" + d.Name + "' class='responsive-image' style='height: 100px !important; opacity: 0.5;'>"
        + "<h5><br>" + d.Name + "</h5>"
        + "<p>" + Category + " | " + Type + " | " + Status + "<br>"
        + "<b style='color:black;'>Geolocation: </b>" + d.geometry.coordinates[0] + ", " + d.geometry.coordinates[0] + "<br>Entry ID: "+d.ID+" - <a href="+d.Source+">Source of Data Entry</a><br><br>"
        + "<b style='color:black;'>Year Built:</b> " + YearBuilt + "<br>" 
        + "<b style='color:black;'>Ownership:</b> " + Ownership + "<br>" 
        + "<b style='color:black;'>Gender:</b> " + Gender + "<br>"
        + "<b style='color:black;'>Ethnicity:</b> " + Ethnicity + "<br>"
        + "<b style='color:black;'>Address:</b> " + Address + "<br>"
        + sr
        + d.Comments + "</p>"
        + "<p>";

        document.getElementById("maptext").innerHTML = t;

        updateImage();
    }


    var svg = d3.select("#map")
    .classed("svg-container", true) 
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 1000")
    .classed("svg-content-responsive", true);

    var path = d3.geoPath();


    var albersProjection = d3.geoAlbers()
    .scale(770000)
    .rotate( [71.057,0] )
    .center( [0, 42.4] )
    .translate([700,-290]);

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
        .attr("opacity", 0)
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
            return "#911a0a";
        } else if (d.Gender == "male"){
            return "#18545e";
        } else if (d.Gender == ""){
            return "white";
        } else {
            return "#7b428c";
        }
    })
        .attr( "opacity", 1 )
        .attr("stroke-width", function(d){
        if(d.Controversy !== "" || d.Vandalized !== ""){
            return 50;
        } else {
            return 0;
        }
    })
        .attr( "stroke", function(d){
        if(d.Gender == "female"){
            return "#911a0a";
        } else if (d.Gender == "male"){
            return "#18545e";
        } else if (d.Gender == ""){
            return "white";
        } else {
            return "#7b428c";
        }
    })
        .attr( "d", geoPath)
        .on("click", mouseClick)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)

};

