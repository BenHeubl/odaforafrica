
// make it responsive
// var mobileScreen = ($( window ).innerWidth() < 595 ? true : false);


// set width and height
var margin = {top: 10, right: 20, bottom: 35, left: 45},
    width = 575 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var keyHeight = 133;

var arraykeyoptions = [-12, 247, 423, 500]

var postionsLabelEgypt = ["340", "268", "330"];
var postionsLabelGunea = ["350", "350", "420"];


var indexPlay = 0;

var TEXT = [
"The scatterplot shows the current official development assistance (ODA) commitments to Africa and the projected changes in response to countries’ United Nations voting alignment with China (2000-2012)",
"By clicking the 'vote like Equatorial Guinea' button, you can see how the official development assistance - an indicator of international aid flow - is projected to decrease for all African countries, if they would change their voting alignment with China to the voting alignment of the west central African state of Equatorial Guinea",
"By clicking the 'vote like Egypt’ button, you can see how the official development assistance is projected to increase, in case all African countries would change their voting alignment with China to the voting alignment of Egypt."
];

var xShare = d3.scale.linear()
	.domain([-70,70])
	.range([0, 200]);


var xShareAxis = d3.svg.axis()
    .scale(xShare)
    .tickSize(-12)
    .orient("bottom")
    .ticks(5)
    .tickFormat(function(d, i){
    if(d==0){return d}
    return d;
    if(i%2==1){return d}
})

//number format
var numberFormat = d3.format(",.0f"),
	numberFormatDetailed = d3.format(",.1f");
	// numberFormatMoreDetailed = d3.format(",.2f");
  numberFormatMoreDetailed = d3.format(",.0")		;

// Set variables for viz
var headerHeight = 50;
var tagColour = "#e11b17";
// yearViz = 2014;

// varsiables: both linear scales
var xscale = d3.scale.linear()
// var xscale = d3.scale.log()
              .range([0, width])
            	.nice();

var yscale = d3.scale.linear()
            .range([0, height])
            .nice();

var colorscale = d3.scale.linear()
            .domain([0, 300000000])
            .range(["#db5c58", "#006aa0"])

var colorsbuttons = ["grey", "#db5c58", "#006aa0", ];
// var colorsbuttons = ["#006aa0", "#53baaa", "#db5c58"];



var xaxis = d3.svg.axis()
//for log scale
              // .scale(xscale)
              // .orient("bottom")
              // .ticks(2, ",.1s")
              // .tickSize(6, 0);
              .tickFormat(d3.format(",.0f"))
  // .tickFormat(function(d, i){
  //             if(d==0){return d}
  //             return "";
  //             if(i%2==1){return d}
  //             }) // format axis accordingly
              .scale(xscale)
              .tickSize(-height) // gives raster effect
              .orient("bottom")
              .ticks(5)
            // .tickSize(-12)
            // .orient("bottom")
            // .ticks(1)

var yaxis = d3.svg.axis()
.tickFormat(numberFormatMoreDetailed) // format axis accordingly
            .scale(yscale)
            .tickSize(-width - 5)
            .orient("left")
            .ticks(5)

            // .tickSize(-12)
            // .orient("bottom")
            // .ticks(1)

var color = d3.scale.category20c();

var headerrectColor = ["grey"];


var arrayoptions = ["Current vote", "Voted like Equatorial Guinea", "Voted like Egypt", ""];



//create canvas
var svg = d3.select("#chart").append("svg")
              .attr("width", 595)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("id", "mainSVG")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var svgKey = d3.select("#key").append("svg")
              	.attr("width", 595)
              	.attr("height", keyHeight)
              	.append("g")
              	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var divMaptip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

          			divMaptip
                				.html(
                				"<div style='font-family:Officina_bold;font-size: 15px;line-height:16px;margin-bottom: 4px;' id='strIndustry'></div>"
                				+ "<div id='strSector'></div>"
                				+ "<svg id='shareChart' width='250' height='120'></svg>"
                				)


// Make key buttons:
svgKey.append("rect")
                      .attr("height", 50)
                      .attr("width", 558)
                      .attr("x", -25)
                      .attr("rx", 1)
                      .attr("ry", 1)
                      .attr("fill", " #F2F2F2")

svgKey.append("rect")
                      .attr("height", 100)
                      .attr("width", 558)
                      .attr("x", -25)
                        .attr("y", 50)
                      .attr("rx", 1)
                      .attr("ry", 1)
                      .attr("opacity", 0.7)
                      .attr("fill", "none")





svg.append("text")
  .classed("egypt", true)
	.text("Egypt's voting alignment with China")
	.attr("letter-spacing",1)
	.attr("x",160)
	.attr("y",78)
	.attr("font-family","Officina")
	.attr("text-anchor","end")
	.attr("fill","#006aa0")

svg.append("text")
  .classed("guinea", true)
	.text("Equatorial Guinea's voting alignment with China")
  .attr("letter-spacing",1)
	.attr("x",270)
	.attr("y",362)
	.attr("font-family","Officina")
	.attr("text-anchor","end")
	.attr("fill","#db5c58")


svg.append("svg:image")
      .attr("xlink:href", "data/africa.png")
      .attr("id","africa")
      .attr("x",0)
      .attr("y",0)
      .attr("height",500)
      .attr("width",500);


var TextExplainer1 = svgKey
  		.append("text")
  		.attr("class", "TextExplainer1")
          .attr("id","TextExplainer")
          .text(TEXT[0])
          .style("font-size", 13)
          .style("text-anchor", "center")
          .attr("x", -17)
          .attr("y", 70)
          .style("font-family", "Officina, Calibri, Arial")

  WrapIt();





  d3.select("#shareChart")
  	.append("g")
  		.attr("class", "x Shareaxis")
  		.attr("transform", "translate(9," + 92 + ")")
  		.call(xShareAxis)
  		.attr("id","xShareAxis")

  d3.select("#shareChart")
  	.append("line")
  	.attr("x1",0)
  	.attr("x2",236)
  	.attr("y1",4)
  	.attr("y2",4)
  	.attr("shape-rendering","crispEdges")
  	.attr("stroke","#ddd");

  d3.select("#shareChart")
  	.append("text")
  	.attr("x",150)
  	.attr("y",60)
  	.attr("font-family","Officina")
    .attr("font-size","12px")
  	.append("tspan")
  	.attr("font-family","Officina_bold")
  	.attr("id","strRev")


  d3.select("#shareChart")
  	.append("text")
  	.attr("x",0)
  	.attr("y",20)
    .attr("font-size","12px")
  	.attr("font-family","Officina")
  	.text("% change if voted like Equatorial Guinea or Egypt")

  d3.select("#shareChart")
      .append("text")
      .attr("x",0)
      .attr("y",60)
      .attr("font-family","Officina")
      .attr("font-size","12px")
      .append("tspan")
      .attr("font-family","Officina_bold")
    	.attr("id","percentChange")

  d3.select("#shareChart")
  	.append("text")
  	.attr("x",xShare(55) + 27)
  	.attr("y",93)
  	.attr("font-family","Officina")
  	.text("+")
  	.attr("font-size","22px")

  d3.select("#shareChart")
  	.append("text")
  	.attr("x",xShare(-55) - 8)
  	.attr("y",91)
  	.attr("font-family","Officina")
  	.text("-")
  	.attr("font-size","22px")


  d3.select("#shareChart")
  	.append("line")
  	.attr("x1",xShare(-55) + 6)
  	.attr("x2",xShare(55) + 22)
  	.attr("y1",85)
  	.attr("y2",85)
  	.attr("stroke-width",3)
  	.attr("shape-rendering","crispEdges")
  	.attr("stroke","#ddd");


  d3.select("#shareChart")
  	.append("line")
  	.attr("x1",xShare(0) + 10)
  	.attr("x2",xShare(0) + 10)
  	.attr("y1",75)
  	.attr("y2",95)
  	.attr("stroke-width",3)
  	.attr("shape-rendering","crispEdges")
  	.attr("stroke","#ddd");

  d3.select("#shareChart")
  	.append("rect")
    .classed("rectneg", true)
  	.attr("height",12)
  	.attr("width",18)
  	.attr("x",40)
  	.attr("y",79)
    .attr("fill","#db5c58")
  	// .attr("fill","#ccc")
  	// .attr("id","shareChart")


  d3.select("#shareChart")
    	.append("rect")
      .classed("rectpos", true)
    	.attr("height",12)
    	.attr("width",18)
    	.attr("x",160)
    	.attr("y",79)
      .attr("fill","#006aa0")
    	// .attr("fill","#ccc")
    	// .attr("id","shareChart")



d3.csv("data/data1.csv", function (error, dataset) {

  dataset.forEach( function (d, i) { //The forEach() method executes a provided function once per array element.
    d.chinaVotes = +d.chinaVotes;
    d.chinaValue = +d.chinaValue;
    d.egyptValue = +d.egyptValue;
    d.guineaValue = +d.guineaValue;
    d.guineaVotes = +d.guineaVotes;
    d.egyptVotes = +d.egyptVotes;
  })
  // console.log(dataset)

  //a word on object min max functions: e.g. var max = d3.max(d3.values(data));
  //http://stackoverflow.com/questions/11488194/how-to-use-d3-min-and-d3-max-within-a-d3-json-command
  //If you just want the max/min value in the object, you can use the d3.values() function to extract all the values in the data as an array, then take the max value in that array:

  //change domain (bounds) of x & y axis
	xscale.domain([1, d3.max(dataset, function (d, i) { return d.egyptValue  }) ]); //use this if normal scale
	//x.domain([2.3,6.1]); //otherwise this for log scale
	yscale.domain([100, 50]);


// Axes
svg.append("g")
              		.attr("class", "x axis")
              		.attr("transform", "translate(0," + height + ")")
              		.call(xaxis)
              			.append("text")
              			.attr("dy", "2.3em")
              			.attr("dx", 350)
              			.style("text-anchor","end")
              			.style("font-style", "italic")
              			.attr("class", "xlabel")
              			.text("Official Development Assistance in USD");

svg.append("g")
              		.attr("class", "y axis")
                  .attr("transform", "translate(-5,0)")
              		.call(yaxis)
                  .append("text")
                  .attr("dy", "-2em")
                  .attr("dx", 230)
                  .style("text-anchor","end")
                  .style("font-style", "italic")
                  .attr("class", "xlabel")
                  // .attr("fill", "grey")
                  .style("font-style", "italic")
                  .attr("transform", "rotate(-90)")
                  .text("% voting alignment with China")
                  // .attr("font-size", 20)
                  .attr("x", -250);


var countries = svg.selectAll(".circlesCentral")
                  .append("g") //append another group
                  .classed("circlesCentralGroup", true);

    countries
                  .data(dataset.sort(function(a,b) { return b.chinaValue > a.chinaVotes; }))
                  //	how to sort the data: .data(countries.sort(function(a,b) { return b.GDP > a.GDP; })) //Sort so the biggest circles are below
                  .enter()
                  .append("rect")
                  .attr("class","countries")
                  .attr("id", function (d, i) {
                    return "countries_" + i;
                  })
                  // .classed("circles", true)
                  .attr("fill", function (d, i) {
                    return "grey";
                  })
                  // .attr("fill", function (d, i) {
                  //   return colorscale(d.chinaValue)
                  // })
                  .attr("r", 3)
                  .attr('width', 5).attr('height', 5)
                  .attr("opacity", 0.7)
                  .attr("x", function (d, i) {
                    return xscale(d.chinaValue);
                  })
                  .attr("y", function (d, i) {
                    return yscale(d.chinaVotes);
                  });



// countries.selectAll(".countries").filter()

  // svg.selectAll(".circlesCentral2")
  //                       .append("g") //append another group
  //                       .classed("circlesCentralGroup", true)
  //                       .data(dataset.sort(function(a,b) { return b.chinaValue > a.chinaVotes; }))
  //                       //	how to sort the data: .data(countries.sort(function(a,b) { return b.GDP > a.GDP; })) //Sort so the biggest circles are below
  //                       .enter()
  //                       .append("circle")
  //                       .attr("class","countriesOriginal")
  //                       .attr("id", function (d, i) {
  //                         return "countriesOriginal_" + i;
  //                       })
  //                       // .classed("circles", true)
  //                       .attr("fill", "grey")
  //                       // .attr("fill", function (d, i) {
  //                       //   return colorscale(d.chinaValue)
  //                       // })
  //                       .attr("r", 1.5)
  //                       .attr("opacity", 0.3)
  //                       .attr("x", function (d, i) {
  //                         return xscale(d.chinaValue);
  //                       })
  //                       .attr("cy", function (d, i) {
  //                         return yscale(d.chinaVotes);
  //                       });





svgKey.selectAll(".keyButtons")
                        .data(arrayoptions)
                        .enter()
                        .append("g")
                        .classed("keyButtons", true)
                        .attr("id", function (d, i) {
                          return "key_" + i;
                        })
                        .attr("transform", function (d, i) { return "translate(" + arraykeyoptions[i] + ", 20)"})
                        // .attr("opacity", 1)
                        .attr("cursor", "pointer")
                        .append("title")
                    		.text(function(d,i){
                    		return "Click here for " + arrayoptions[i];
                    		});

svgKey.selectAll(".keyButtons")
                        .append("rect")
                        .classed("buttonrect", true)
                        .attr("rx", 2)
                        .attr("ry", 2)
                        .attr("width",function(d,i){
                            if(i==0){return 92}
                            if(i==1){return 170}
                            if(i==2){return 110}
                        })
                        .attr("height",40)
                        .attr("x",-6)
                        .attr("y",-15)
                        .attr("fill", "#ffffff")
                        .attr("fill-opacity",0.4)
                        .attr("id", function (d, i) {
                          return "rectus_" + i;
                        })
                         .on("click", function (d, i) {
                           console.log(i)
                           console.log(d)

                           toggle(i);

                         });

                         toggle(0);


svgKey.selectAll(".keyButtons")
                        .append("text")
                        .classed("textus", true)
                        .attr("id", function (d, i) {
                          return "textus_" + i;
                        })
                        .attr("x", 5)
                        .attr("y", 8)
                        .attr("id", function (d, i) {
                          return "buttonsText_" + i;
                        })
                        .text(function (d, i) {
                          return arrayoptions[i];
                        })
                        .style("pointer-events", "none")
                        .style("fill", function (d, i) {
                          return colorsbuttons[i];
                        })
                        .attr("font-family","Officina")

d3.select('#buttonsText_0').style('fill', function (d, i) {
                              return "white";
                              // return colorstoggles[d];
                              });


function toggle (i, d) {


                        indexPlay = i;
                        console.log(indexPlay)

                        d3.select("g .x.axis")
                                          .call(xaxis)


                        d3.select("#TextExplainer").text(TEXT[indexPlay])
                    											WrapIt();


                        d3.select(".egypt").transition().duration(400).attr("x", function (d, i) {
                            return postionsLabelEgypt[indexPlay];
                        })

                        d3.select(".guinea").transition().duration(400).attr("x", function (d, i) {
                            return postionsLabelGunea[indexPlay];
                        })


                        d3.select("g .x.axis")
                                      		.call(xaxis)

                        d3.selectAll(".buttonrect").attr("fill", "#e6e6e6")
                              .attr("stroke-width",2)
                              .attr("stroke",function (d, i) {
                                return "white";
                              })
                              .attr("stroke-opacity", 0.5)
                              // d3.selectAll(".toggletext").style("fill", "red");

                        d3.select('#rectus_' + indexPlay).attr('fill', function (d, i) {
                              return colorsbuttons[indexPlay];
                              }).attr("stroke", function(d) { return colorsbuttons[i]})
                              // .attr("stroke-width", 0.7);
                              .attr("stroke-width",3)



                        d3.selectAll('.textus').style('fill', function (d, i) {
                              return colorsbuttons[i];
                              });
                        // d3.select("#textus_" + indexPlay).style('fill', "red")

                        d3.select('#buttonsText_' + indexPlay).style('fill', function (d, i) {
                              return "white";
                              // return colorstoggles[d];
                              });




                        d3.selectAll(".countries")
                        .transition()
                        .duration(function (d, i) {
                          return (xscale(d.chinaValue)*5)
                        })
                        .attr("x", function (d, i) {
                          if (indexPlay == 0) {
                            // console.log (d.chinaValue)
                          return xscale(d.chinaValue);
                          }
                          else if (indexPlay == 1) {
                            // console.log(d.guineaValue)
                          return xscale(d.guineaValue);
                          }
                          else if (indexPlay == 2) {
                            // console.log(d.egyptValue)
                          return xscale(d.egyptValue)
                          }
                        })
                        .attr("cy", function (d, i) {
                          return yscale(d.chinaVotes);
                        })
                        .attr("stroke-width", function (d, i) {

                          if (d3.select(this).attr("id") == "countries_17") {
                            return 10;
                          } else if (d3.select(this).attr("id") == "countries_32") {
                            return 10;
                          }

                        })
                        .attr("stroke", function (d, i) {
                          if (indexPlay == 0) {

                            if (d3.select(this).attr("id") == "countries_17") {
                              return "#db5c58";
                            } else if (d3.select(this).attr("id") == "countries_32") {
                              return "#006aa0";
                            }
                            // console.log (d.chinaValue)
                          return "grey";
                          }
                          else if (indexPlay == 1) {

                            if (d3.select(this).attr("id") == "countries_17") {
                              return "#db5c58";
                            } else if (d3.select(this).attr("id") == "countries_32") {
                              return "#006aa0";
                            }
                            // console.log (d.chinaValue)
                          return "grey";
                          }
                          else if (indexPlay == 2) {

                            if (d3.select(this).attr("id") == "countries_17") {
                              return "#db5c58";
                            } else if (d3.select(this).attr("id") == "countries_32") {
                              return "#006aa0";
                            }
                            // console.log (d.chinaValue)
                          return "grey";
                          }
                        })



                     }

var voronoi = d3.geom.voronoi()
                	.x(function(d) { return xscale(d.chinaValue); })
                	.y(function(d) { return yscale(d.chinaVotes); })
                	.clipExtent([[0, 0], [width, height]])

var voronoiGroup = svg.append("g")
                	.attr("class", "voronoiWrapper");

voronoiGroup.selectAll("path")
                  	.data(voronoi(dataset))
                  	.enter()
                    .append("path")
                    .attr("class", "vononi")
                  	.attr("d", function(d, i) { return "M" + d.join("L") + "Z"; })
                  	.datum(function(d, i) { return d.point; })
                  	.attr("id", function(d,i) { return "voronoi " + d.country; }) //Give each cell a unique class where the unique part corresponds to the circle classes
                  	// .style("stroke", "#2074A0") //I use this to look at how the cells are dispersed as a check
                  	.style("fill", "none")
                  	.style("pointer-events", "all")
                    .on("click", function (d, i) {
                      console.log(d3.select(this).attr("class"))
                    })
                  	.on("mouseover", showTT)
                    .on("mouseout", hideTT);

                  	// .on("mouseout",  removeTooltip);




function showTT (d, i) {

        divMaptip
        		.style("left", function(){
        			// if(d3.event.pageX>340){return (d3.event.pageX - 260) + "px"}
        			return (d3.event.pageX + 10) + "px";
        		})
        		.style("top", (d3.event.pageY - 160) + "px")
        		.style("display", "block")
        		.transition()
        		.delay(200)
        		.duration(300)
        		.style("opacity", 1);

        				d3.select("#strIndustry").text("Country: " + d.country);
        				d3.select("#strSector").text("Current ODA: $" + (d.chinaValue/1000000) + " million");
        				d3.select("#strRev").text("Vote like Egypt");
                d3.select("#percentChange").text("Vote like EG");

        				// d3.select("#strShare97").text(numberFormat(d.axis_x1));
        				// d3.select("#strShareLatest").text(numberFormat(d.axis_y1));


                // d.guineaVotes = +d.guineaVotes;
                // d.egyptVotes = +d.egyptVotes;

        		updateShare(d.guineaVotes,d.guineaVotes, d.egyptVotes, d.chinaValue);

            // updateShare(d.axis_x1,d.axis_y1, d.axis_y2, d.SECTOR_DESC);


        	// if (mouseX > (0.5*width)) {
        	// 	divMaptip
        	// 		.style("left", (d3.event.pageX - 260) + "px")
        	// }
          //
        	// if (mouseY < 40) {
        	// 	divMaptip
        	// 		.style("top", (d3.event.pageY + 10) + "px")
        	// }


                      //Save the chosen circle (so not the voronoi)
        	var element = d3.selectAll("#countries_"+ i)
                      .style("opacity", 0.6).attr("stroke-width", 10)
                                  // .attr("fill", "black");


                      // divMaptip
              				// 	.transition()
              				// 	.duration(100)
              				// 	.style("opacity", 0.8)
                      //
                      // divMaptip.html("Country: " + d.country + "<br> ODA: " + d.chinaValue + "<br>Vote with China: " + d.chinaVotes)
              				// 	.style("color", colorscale(d.chinaValue))
                      //   .style("text-anchor", "start")
              				// 	.style("font-family", "Officina, Calibri, Arial")
              				// 	.style("left", (d3.event.pageX+50) + "px")
              				// 	.style("top", (d3.event.pageY-20) + "px")
                      //   // .attr("width", text.node().getBBox().width)
              				// 	// .attr("height", text.node().getBBox().height)


                  svg.append("g")
                    .attr("class", "guide")
                    .append("line")
                    .attr("x1", element.attr("x"))
                    .attr("x2", element.attr("x"))
                    .attr("y1", +element.attr("cy"))
                    .attr("y2", (height))
                    .style("stroke", element.style("fill"))
                    .style("opacity",  0)
                    .style("pointer-events", "none")
                    .style("stroke-dasharray", (0.1, 5))
                    .transition().duration(200)
                    .style("opacity", 0.5);


                  svg.append("g")
                    .append("g")
                    .attr("class", "guide")
                    .append("line")
                    .attr("x1", +element.attr("x"))
                    .attr("x2", 0)
                    .attr("y1", element.attr("cy"))
                    .attr("y2", element.attr("cy"))
                    .style("stroke", element.style("fill"))
                    .style("opacity",  0)
                    .style("pointer-events", "none")
                    .style("stroke-dasharray", (0.1, 5))
                    .transition().duration(500)
                    .style("opacity", 0.5);
                    }

function updateShare(voteginea, voteegypt){


                    //
                    // intShareChange = +intLatest - +int97;
                    // if(intShareChange<0){
                    // 	intShareStart = intShareChange;
                    // 	intShareEnd = 0;
                    // }else{
                    // 	intShareStart = 0;
                    // 	intShareEnd = intShareChange;
                    // }

                    d3.select("#rectneg")
                        .attr("x",20)
                        // .transition()
                        // .duration(200)
                        .attr("width", 20)
                        .attr("fill","red");

                    d3.select("#rectpos")
                    	.attr("x",50)
                    	// .transition()
                    	// .duration(200)
                    	.attr("width", 20)
                    	.attr("fill","red");

                    	// d3.select("#percentChange")
                    	// 	.text(intShareChange.toFixed(1) + "%")

                    }


function hideTT (d, i) {

              d3.selectAll(".countries").attr("stroke-width", function (d, i) {

              if (d3.select(this).attr("id") == "countries_17") {
                return 10;
              } else if (d3.select(this).attr("id") == "countries_32") {
                return 10;
              }

              })

              //Save the chosen circle (so not the voronoi)
              d3.selectAll("#countries_"+ i)
                            .style("opacity", 0.6).attr("stroke-width", 2)

              d3.selectAll(".guide")
                            .style("opacity", 0);


              divMaptip
                            .transition()
                            .duration(100)
                            .style("opacity", 0)

              divMaptip
                            .style("opacity", 0)
                    				.style("display", "none");



            }


})


function wrap(text, width) {

			   text.each(function () {
			       var text = d3.select(this);
			       // if(width>100){
			           var words = text.text().split(/\s+/).reverse();
			       // }else{
			           // var words = d3.select(this).data()[0].phrase.split(/\s+/).reverse();
			       // }

			       var word,
			           line = [],
			           lineNumber = 0,
			           lineHeight = 1.1, // ems
			           wx = text.attr("x"),
			           wy = text.attr("y"),
			           dy = 0, //parseFloat(text.attr("dy")),
			           tspan = text.text(null)
			                       .append("tspan")
			                       .attr("x", wx)
			                       .attr("y", wy)
			                       .attr("dy", dy + "em");
			       while (word = words.pop()) {
			           line.push(word);
			           tspan.text(line.join(" "));
			           if (tspan.node().getComputedTextLength() > width) {
			               line.pop();
			               tspan.text(line.join(" "));
			               line = [word];
			               // if(width==300){alert('jkj')}
			               tspan = text.append("tspan")
			                           .attr("x", wx)
			                           .attr("y", wy)
			                           .attr("dy", ++lineNumber * lineHeight + dy + "em")
			                           .text(word);
			           }
			       }
			   });
			}



function WrapIt(){
			 d3.select("#TextExplainer")
			 .transition().duration(2000)
			   .call(wrap,(550));

			}
