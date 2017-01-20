//////////////////////////  This javascript file has several functions that is used to create the bubble matrix function   //////////////////////////////////////


////// This JS file has two functions. One is a helper function for colors function = returnColor(RD_YT_or_GC)
////// The other function = bubbleMaker(status_monthsOn, locationID, data0, legend) is the main function that creates the d3.js based bubbleMaker figure.

///// old color scheme from snap-shot view or stacked bars? can't remember, but it might need to be reintegrated???? keep!
//"#e59393 ", "#e31c3d ", "#fad980 ", "#fdb81e ", "#94bfa2 ", "#2e8540 "


////// A helper function that returns a color for each color variable.
function returnColor(RD_YT_or_GC){
  if(RD_YT_or_GC === "RD"){
    // console.log("in RD ",RD_YT_or_GC)
    return "#e31c3d"}
  else if(RD_YT_or_GC === "YT"){
    // console.log("in YT ",RD_YT_or_GC)
    return "#fdb81e"}
  else if(RD_YT_or_GC === "GC"){
    // console.log("in GC ",RD_YT_or_GC)
    return "#2e8540"}
    // return "#4cc922"}
  else{
    console.log("no color match in function returnColor", RD_YT_or_GC);
    // return "#eff0ff"
    return "#e5e5e5"
    // return "white"
  }
}

////// The main function that creates individual bubble matrix figure. It used D3.js.
////// Definition of each argument in the function:
//////      - "locationID" is the id of the html DOM element where the bubble matrix figure will be placed
//////      - "data0" is the actual data inputed
//////      - "legend" is a string. If it exist, a legend will be produced as the bubble matrix figure. If not present, a normal bubble matrix figure will be made
//////      - "status_monthsOn" is the status of months_on, for exampe; "months_on__Stat-PMO". It is now called populated with sharedFigFilter.transate.defaultStatusTypeForDisplay, which should be the PMO status type
//////Assumptions:
/////       - "month", "title", and "WBS" are found using the shareFigFilter object under sharedFigFilter.dataset_col_names.col.month,sharedFigFilter.dataset_col_names.col.Title, sharedFigFilter.dataset_col_names.col.WBS
/////             - ++++++  NOTE ++++++++  "month" is currently assumed to be an integer. If it changes to a string, some of this code will need to be changed!!!!
/////       - ++++++  NOTE ++++++++ color names are an assumption that also needs to be put into shareFigFilter or hard coded potentially differently
function bubbleMaker(status_monthsOn, locationID, data0, legend){
  //console.log("data inside d3 function initially is =",data0)
  //console.log("Bubble_Multi.js bubbleMaker locationID",locationID)
 
  var totWidth = 600,
      totHeight =  4*data0.length
      //totHeight = totWidth * 4.4,
      margin = {top: 65, right: 250, bottom: 80, left:110},
      width = totWidth - (margin.left + margin.right),
      height = totHeight - (margin.top + margin.bottom);
  //console.log("Bubble_Multi bubbleMaker data0.length =",data0.length)

  if (data0.length < 60){
    totHeight =  300;
    margin = {top: 35, right: 250, bottom: 50, left:110}
  }
  if (data0.length > 600){
    totHeight =  3.1*data0.length
  }

  if (legend === "legend"){
    totWidth = 400,
      //totHeight =  0.51*data0.length
      //totHeight =  data0.length
      totHeight = 200,
      //totHeight = totWidth * 4.4,
      margin = {top: 35, right: 100, bottom: 150, left:100},
      width = totWidth - (margin.left + margin.right),
      height = totHeight - (margin.top + margin.bottom);
  }    
  //////  old settings that I might want to go back to in the future
  // if (legend === "legend"){
  //   totWidth = totWidth,
  //     totHeight =  2*data0.length
  //     //totHeight = totWidth * 4.4,
  //     margin = {top: 10, right: 10, bottom: 10, left:10},
  //     width = totWidth - (margin.left + margin.right),
  //     height = totHeight - (margin.top + margin.bottom);
  // }    

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width]);

      //// instead of using height, used data length / months * height of each cell is total height (and started cells as 0, not 0+height)
  var lengthOfCells = data0.length*35/12

  var y = d3.scale.ordinal()
      // .rangeRoundBands([height, 0]);
      .rangeRoundBands([lengthOfCells, 0]);

  var y2 = d3.scale.ordinal()
      // .rangeRoundBands([height, 0]);
      .rangeRoundBands([lengthOfCells, 0]);
    
  var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("top");
   
  var yAxis = d3.svg.axis()
      .scale(y)
      // .attr("translate",600)
      .orient("left")
      // .attr("transform","translate(20,0)");
      //.attr("transform",20)

  var yAxis2 = d3.svg.axis()
      .scale(y2)
      .orient("right")
      
  var chart = d3.select(locationID)
      .attr("width", totWidth)
      .attr("height", totHeight)
    .append("g")
      .attr("transform","translate("+margin.left+","+margin.top+")");
   
////////////////////  took this out as data is being loaded in main.js and passed into this function now    ////////////////////////////////
////////////////////  took out a })   below as well    //////////////////////
        ///d3.csv("data/fake_big_dataset2.csv"/*, type*/, function(error, data) {
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   data = data0
   ///////// replaceing everything immediately below but commented out with the block below it:
   ///////// var grpNames = d3.keys(data[0]).filter(function(key) { return key !== "Industry"; });

    x.domain(data.map(function(d) {return d[sharedFigFilter.dataset_col_names.col.month];} ));
    y.domain(data.map(function(d) {return d[sharedFigFilter.dataset_col_names.col.WBS];} ));
    y2.domain(data.map(function(d) {return d["Title"];} ));

  //////// end of block above //////
  console.log("Bubble_Mutli data0.length",legend, data0.length, data0)
  if(data0.length <13 && typeof legend === 'undefined'){
    console.log("Bubble_Mutli got into Bubble_Mutli data0.length===0 legend === 'undefined' data0.length = ",data0.length)
    $(locationID).append("<h3>No Projects Matched Your Filter Selections</h3>")
  }

  if(typeof legend === 'undefined' && data0.length>0){
        
    chart.append("g")
        .attr("class","x axis")
        .attr("transform","translate(-10,5)")
        .call(xAxis)
          .selectAll("text")
  	      	.style("text-anchor","top")
            .attr("transform","translate(3,0)")
  	      	// .attr("transform","rotate(0)")
  	      	.attr("dx","0.5em")
            .attr("dy","0em")
            ///// used to have dy be based on rangeBand(), but that turned out to be variable scaling in size depending on input data length
  	      	// .attr("dy",x.rangeBand()/0.4-10)
     ;	
    // console.log("x.rangeBand()/2-10",x.rangeBand()/2-10)

    chart.append("g")
        .attr("class","y axis")
        .attr("transform", "translate(-55,0)")
        .call(yAxis)
        
        .selectAll("text")
          .style("text-anchor", "start");
     ;

     chart.append("g")
        .attr("transform", "translate(" + width + " ,0)") 
        .attr("class","y axis")
        .call(yAxis2)
     ;

     chart.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(-70,"+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .attr("class","axis")
          .text(sharedFigFilter.dataset_col_names.col.WBS);

      chart.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("y",-width-margin.right/1.1)
          .attr("x",+height/2)
          .attr("transform", "rotate(+90)")
          .attr("class","axis")
          .text("Name");


    chart.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          // .attr("transform", "translate(-200,"+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .attr("x",width/2)
          // .attr("y",-margin.top/4)
          .attr("y",-15)
          .attr("class","axis")
          .text("Month");
      
     
    var tempDWBS = 0;
    var tempWBS = 0;
    var starterWBSrow = 0;

    var checkFirstRow = {"firstRowFirstPos":"no", "FirstRowNotFirstPos":"no","RowDimensionValue":"notAValue","firstRow":"yes","yTranslateValue":0}

    var grows = chart.selectAll(".chart")  		
    		.data(data)
    	.enter().append("g")
    		.attr("class","grow")
        // .attr("id",function(d i){return i})
    		// .attr("transform", function(d) { return "translate(0," + y(d.Industry) + ")"; })
        .attr("transform", function(d) { 
            console.log("Bubble_Multi var grows A, checkFirstRow.RowDimensionValue",checkFirstRow.RowDimensionValue)
            if(checkFirstRow.RowDimensionValue !== d.WBS && checkFirstRow.RowDimensionValue !== "notAValue"){
              checkFirstRow.RowDimensionValue = d.WBS;
              checkFirstRow.yTranslateValue = 35 + checkFirstRow.yTranslateValue
              console.log("Bubble_Multi var grows B")
            }
            else if(checkFirstRow.RowDimensionValue !== d.WBS){
              checkFirstRow.RowDimensionValue = d.WBS;
              checkFirstRow.yTranslateValue = 0 + checkFirstRow.yTranslateValue
              console.log("Bubble_Multi var grows B")
            }

          // }
            else{console.log("Bubble_Multi var grows - apparently forgot a possible situation")}

          return "translate(0," + checkFirstRow.yTranslateValue +" )" ;})
    	;


    var gcells = grows.append("g")
    gcells
        .attr("transform", function(d, i) {
          return "translate(" + (d.month-1)*x.rangeBand() + ",0)" ;})


    		.attr("class","gcell")
    	;
  	
    function alterRectHeight(){
      if(data0.length > 6){
        return 35
      }
      else {
        return y.rangeBand()
      }
    }

  	gcells
      // .data(data)
      // .enter()
  		.append("rect")
  			.attr("x",0)
  			.attr("y",0)
  			// .attr("height",y.rangeBand())
        .attr("height", alterRectHeight())
        
  			.attr("width",x.rangeBand())
  			.style("fill-opacity",1)

        .style("fill",function(d){
          ////////////// if single number = dark
          ////// else = light
          console.log("bubble_Multi gcells rangeBand()", x.rangeBand())
        console.log("bubble_Multi gcells alterRectHeight()", alterRectHeight())
         console.log("bubble_Multi gcells d.WBS", d.WBS)
          if (d[status_monthsOn] < 1){
            return "white"
          }
          else if(Number.isInteger(d.WBS)){
              {return "#e5e5e5";}
          }
          else {
              // {return "#eeeeee";} 
              {return "#e5e5e5";} 
          }
        })

    


    /////// directly below is old remax, now it is a static number. Making it variable was okay for original use but bad now that I wanted to fix the size rather than expand or shrink size to fit a fixed box.
    ///////rmax = Math.min(y.rangeBand()/2-2,x.rangeBand()/2-2)
    rmax = 7
    ///console.log("Bubble_Multi.js test")
    //console.log("Bubble_Multi.js bubbleMaker rmax = ",rmax)

    function nonsense(d_thing){
      var rind = parseInt(d_thing);
      return rmax / ((-1)*(rind - 6));
    }



    gcells
        .append("circle")
        ///////  took out line below and went to fixed version
        /////// .attr("cy",y.rangeBand()/2)
        .attr("cy",18)
        .attr("cx",x.rangeBand()/2)
        // .attr("r", 4)
        ///// size depends on how long a project has been in the given status, otherwise known as "months-on"
        .attr("r", function(d) {
              //console.log("d[status_monthsOn] =",d[status_monthsOn], "d.WBS= ", d.WBS, "d.month =", d.month)
              var rind = parseInt(d[status_monthsOn]);

              if(d[translateMonthsOnToStatusOnly(status_monthsOn)]==="GC" && d[status_monthsOn] !== 0){
                return rmax*0.45
              }
              else if(rind > 4){
                //return rmax
                return rmax*1.2
              }
              else if(rind === 0){
                return rmax*0.5
              }
              else{
                // return rmax - ((-1)*(rind - 7));
                // return ((-2)*(rind - 7));
                ///////////   used to use the one directly below   //////////
                return rmax - (rind-4)*(-1)
                //return rmax
              }
            }
        )
        .style("fill", function(d) {
            var color_name = returnColor(d[translateMonthsOnToStatusOnly(status_monthsOn)])
            if(parseInt(d[status_monthsOn]) < 0.1){
              // return "white"
              return color_name
            }
            else {
              return color_name
            }
          })
        // .style("fill", "red")
        // .style("stroke","black")
        .style("stroke",function(d){
          if(parseInt(d[status_monthsOn]) < 0.1){
            // return returnColor(d[translateMonthsOnToStatusOnly(status_monthsOn)])
            // return "white"
            return "black"
          }
          else{
            return "black"
          }
        })
        .style("stroke-width",function(d){
          if(parseInt(d[status_monthsOn]) < 0.1){
            return 0.2
          }
          else{
            return 0.35
          }
        })
        // .attr("stroke-width", 2)
        ;
  }



  ///// this makes a legend if the legend variable is present and equals a "legend string"
  ///// it uses some of the dimensions given at the top of this function
  if(legend==="legend"){
    //console.log("got into legend")
    //console.log("Bubble_Multi.js if(legend) data = ",data)
    // console.log("Bubble_Multi.js if(legend) d = ",d)
    //// old rmax fucntion below before changed it to fixed size
    //// rmax = Math.min(y.rangeBand()/2-2,x.rangeBand()/2-2)
    var rmax = 8
     var legend = chart
     .append("g")
       .attr("transform", "translate(0," + (height + 0) + ")")
       .attr("class","legend")
        // .attr("x",50)
       .style("font-weight","bold")
     ;
     

   var legwidths = [0,75,125,180];
    var legwidthsCircle = [0,3,9,27];
    var legMonths = [0,1,2,3,4,5];
    var legsymbols = legend.selectAll(".legsymbols")
        .data(["no data","red","yellow","green", "changed", "not changed"])
      .enter()
       .append("g")
         .attr("class","legsymbols")
         // .attr("transform",function(d,i) {return "translate(" + (120 + legwidths[i]) + ",0)";})
          .attr("transform",function(d,i) {return "translate("+30+","+(20+(i*20))+")";})
      ;
      
    var legendspace = 5;
    
    legsymbols.append("circle")
        // .attr("cx", function(d,i) {return rmax / ((-1)*((i+1) - 5)) ;})
        // .attr("cx", function(d,i) {return legwidthsCircle[i] })
        .attr("cx", function(d,i) {return 0 })

        // .attr("cy", function(d,i) {return (legendspace+2*rmax) - (rmax / ((-1)*((i+1) - 4))) ;})
        .attr("cy", function(d,i) {return (legendspace+2*rmax) - (rmax / ((-1)*((1) - 4))) ;})
       .style("fill", function(d,i) {
            console.log("test legend , d[i] =",d)
            if(d[i] === "no data"){return returnColor("GRAY")}
            else if(d === "red"){return returnColor("RD")}
            else if(d === "yellow"){return returnColor("YT")}
            else if(d === "green"){return returnColor("GC")}
            else{return returnColor("GRAY")}  

           // var gbval = 1+Math.floor(255 - (255/4*((i+1)-1)));
           // return "rgb(" + 255 + "," + gbval + "," + gbval + ")";
           }
         )
       .style("stroke","black")
       .attr("r", function(d,i) {
            if(i>3){return 0}
            else{
              return rmax / ((-1)*((2+1) - 5));
            }
           }
         )
   ;

    legsymbols.append("rect")
        // .attr("cx", function(d,i) {return rmax / ((-1)*((i+1) - 5)) ;})
        // .attr("cx", function(d,i) {return legwidthsCircle[i] })
        .attr("x", function(d,i) {return -6 })

        // .attr("cy", function(d,i) {return (legendspace+2*rmax) - (rmax / ((-1)*((i+1) - 4))) ;})
        .attr("y", function(d,i) {return (legendspace) - (rmax / ((-1)*((1.3) - 0))) ;})
        .style("fill", function(d,i) {
            console.log("legsymbols.append('rect'), d = ",d)

            if(d === "changed"){return "white"}
            else if(d === "not changed"){return "e5e5e5"}
            else{
              console.log("messed up in legsymbols.append('rect')")
              return "pink"
            }
          })
        .style("stroke","black")
        // .attr("width",10)
        .attr("height",15)
        .attr("width", function(d,i) {
            if(i<4){return 0}
            else{
              return rmax / ((-1)*((3.2+1) - 5));
            }
            // return rmax / ((-1)*((i+1) - 5));
            // return rmax / ((-1)*((2+1) - 5));
            }
          )
    ;

    legsymbols.append("text")
        // .attr("x", function(d,i) {return 5+2*rmax / ((-1)*((i+1) - 5)) ;})
        .attr("x", function(d,i) {return 19 ;})
        .attr("y", legendspace + 2*rmax)
        .style("text-anchor", "start")
        .text(function(d) { return d; });
        
     legend
       .append("text")
       .text("  Status:")
       .attr("y", rmax*2+ legendspace)
       .attr("x",10)
     ;
   


  //////////////////////

      var legend_2 = chart
      .append("g")
        .attr("transform", "translate(50," + (height + 0) + ")")
        .attr("class","legend")
        .style("font-weight","bold")

        legend_2
        .append("text")
        .text("Months in status:")
        .attr("y", rmax*2+ legendspace)
        .attr("x",70)
      ;

       legend_2
        .append("text")
        .text("Legend")
        .attr("y", rmax*2+ legendspace)
        .attr("x",-60)
        .style("font-size","20px")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(-80,"+(height/2.2)+")rotate(-90)") 
        ;
   
     var legsymbols_2 = legend_2.selectAll(".legsymbols_2")
        .data([0,1,2,3,4,5])
      .enter()
        .append("g")
          .attr("class","legsymbols_2")
          // .attr("transform",function(d,i) {return "translate(" + (120 + legwidths[i]) + ",0)";})
          .attr("transform",function(d,i) {return "translate("+80+","+(20+(i*20))+")";})
      ;


        legsymbols_2.append("text")
        // .attr("x", function(d,i) {return 5+2*rmax / ((-1)*((i+1) - 5)) ;})
        .attr("x", function(d,i) {return 29 ;})
        .attr("y", legendspace + 2*rmax)
        .style("text-anchor", "start")
        .text(function(d) { 
          if(d>4.9){
            return "> "+ d +" months"
          }
          // else if (d===0){
          //   return ""+ d +" months"
          // }
          else{
            return d +" months"; 
          }
          
        });
       
       legsymbols_2.append("circle")
        .attr("cx", function(d,i) {return 10 })
        .attr("cy", function(d,i) {return (legendspace+2*rmax) - (rmax / ((-1)*((1) - 4))) ;})
        .style("fill", function(d,i) {
            console.log("test legend , d[i] =",d)
            if(d[i] === "no data"){return returnColor("GRAY")}
            else if(d === "red"){return returnColor("RD")}
            else if(d === "yellow"){return returnColor("YT")}
            else if(d === "green"){return returnColor("GC")}
            else{
               console.log("Bubble_Multi.js if(legend) got to bottom 1 ")  
              return returnColor("GRAY")}  
            }
          )
        .style("stroke","black")
             .attr("r", function(d) {
              var rind = parseInt(d);
              if(d === 0){
                return rmax*0.5
              }
              else if(rind > 4){
                //return rmax
                return rmax*1.2
              }
              else if(rind === 0){
                return rmax*0.5
              }
              else{
                return rmax - (rind-4)*(-1)
              }
            }

        );
  }
}




