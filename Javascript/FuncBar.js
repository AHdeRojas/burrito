!function(){
  var fB = {};

  var x = d3.scale.ordinal();
  var y = d3.scale.linear()

  var xAxis = d3.svg.axis()
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .orient("left")
  .tickFormat(d3.format(".2s"));


  //TO DO
  //figure out how to remove old graph
  //

  fB.vizData = function(data){

    var alldata = [];
    var y0 = 0;
    var y1 = 0;
    var total = 0;
    data.forEach(function(d) {
      var length = d.data.length;
      var y0 = 0;
      var y1 = 0;
      var h = d.length-1;

      //assign values for size of bars
      d.data.forEach(function(e){
        e.y0 = y0*100;
        e.y1= (y0 += +e.contributions)*100; 



      })

      total = d.data[length-1].y1;

      d.data.forEach(function(e){
        e.total = total;

        e.y0 = Math.round(e.y0/e.total*100*100)/100;
        e.y1 = Math.round(e.y1/e.total*100*100)/100;


      })


      
    });

    var h = [];
    data.map(function(d) { 
      d.data.map(function(e){
        h.push(e.Sample);
        return e.Sample;
      })  });
    x.domain(h);
    y.domain([0, 100]);


    return data;
  }



  getSampleGroup = function(samp, sampledata){
    treatment = sampledata.filter(function(e){ return e.Sample==samp; })[0].Treatment;
    day=sampledata.filter(function(e){ return e.Sample==samp; })[0].Day;
    if(treatment==="Antibiotic"){
      if(day==="2") return "1";
      else return "2";
    } else{
      if(day==="2") return "3";
      else return "4";
    }

  }



  var sampleColor = d3.scale.ordinal();
  sampleColor["1"] = "red";
  sampleColor["2"] = "darkred";
  sampleColor["3"] = "steelblue";
  sampleColor["4"] = "darkblue";



  fB.Draw = function(stackdata, sampledata, colors, svglink, dims, highlight_overall, dehighlight_overall){

   x.rangeRoundBands([0, dims.width], .3);
   y.rangeRound([dims.height, 0]);

   xAxis.scale(x);
   yAxis.scale(y);

   var viz = fB.vizData(stackdata);
    //get the x axis set


  svglink.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", function(d) {
    return "rotate(-35)"
  });
  //y axis label
  svglink.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("x", -110)
    .attr("font-size",16)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Relative Contribution %");

  //x-axis label
    svglink.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 470)
    .attr("x", 300)
    .attr("font-size",16)
    .attr("dy", ".75em")
    .text("Samples");





  svglink.selectAll("text").style("fill",function(m){
    if(sampledata.map(function(e){ return e.Sample; }).indexOf(m)!==-1){
      return sampleColor[getSampleGroup(m, sampledata)];        
    }
  });
    //init the tooltip as invisible
  var tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background", "lightyellow")
  .style("opacity", "1")
  .style("border", "0px")    
  .style("border-radius", "4px")  
  .style("padding","2px")

  .text("a simple tooltip");






    //create a Sample object, creates 28 groups(one for each sample)
  var Sample = svglink.selectAll(".Sample")
  .data(viz)
  .enter().append("g")
  .attr("class", "g")
  .attr("transform", function(d) {return "translate(" + x(d.Sample) + ",0)"; });


    //create rects for each value, transpose based on sample

  Sample.selectAll("rect")
  .data(function(d) { 

   return d.data;
 })
  .enter().append("rect")
  .attr("func", function(d) {return d.func})
  .attr("taxon", function(d) { return d.Taxa})
  .attr("width", x.rangeBand())
  .attr("y", function(d) {return y(d.y1); })
  .attr("height", function(d) {return y(d.y0) - y(d.y1);} )
  .style("fill", function(d) { return colors(d.func); })
  .style("opacity", 0.6)
  .on("mouseover", function(d){
    current_rectangle_data = d3.select(this).datum();
    highlight_overall("", current_rectangle_data.func, 2);
          tooltip.html("<strong>Function: </strong>" + current_rectangle_data.func + "<br>" + "<strong>Taxa: </strong>" + current_rectangle_data.Taxa + " <br>" + "<strong>Relative Contribution: </strong>" + Math.round(current_rectangle_data.contributions*100*100)/100+ "%");
          return tooltip.style("visibility", "visible");
        })
  .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  .on("mouseout", function(){
    current_rectangle_data = d3.select(this).datum();
    dehighlight_overall("", current_rectangle_data.func, 2);
    return tooltip.style("visibility", "hidden");


  });






    //init y-axis
  svglink.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .attr("class", "y_label");




}

fB.select_bars = function(func, colors){
  selected = d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.func == func;
    });
  current_color = selected.style("fill");

  var t = textures.lines()
    .thicker()
    .background(colors(func))
    .stroke("white");

  d3.select("#func_bars").call(t);

    selected.style("opacity", 1)
        .style("fill", t.url());

    // .style("stroke", "yellow")
    // .style("stroke-width",2);
}

fB.deselect_bars = function(func, colors){
  d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.func == func;
    })
    .style("opacity", 0.6)
    .style("fill", colors(func));
}

fB.select_contribution = function(taxon, colors){
  console.log(colors);
  var selected = d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.Taxa == taxon;
    });

  selected.style("opacity", 1)
    .style("fill", function(d){
      col = colors(d.func);
      var t = textures.lines()
        .thicker()
        .background(col)
        .stroke("white");

      d3.select("#func_bars").call(t);

      return t.url();
    });

}

fB.deselect_contribution = function(taxon, colors){
  selected = d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.Taxa == taxon;
    });
    selected.style("opacity", 0.6).style("fill",function(d){ return colors(d.func); });
}

fB.select_single_contribution = function(taxon, func, colors){
  selected = d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.func == func && d.Taxa == taxon;
    });

  var t = textures.lines()
    .thicker()
    .background(colors(func))
    .stroke("white");

  d3.select("#func_bars").call(t);

  selected.style("opacity", 1)
    .style("fill", t.url());

}

fB.deselect_single_contribution = function(taxon, func, colors){
  selected = d3.select("#func_bars")
    .selectAll(".g")
    .selectAll("rect")
    .filter(function(d) {
      return d.func == func && d.Taxa == taxon;
    });

    selected.style("opacity", 0.6).style("fill", function(d){ return colors(d.func); });
}

this.fB = fB;
}();