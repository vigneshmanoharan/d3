//our root app component
import {Component, NgModule, OnInit, AfterViewInit, OnDestroy} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {miserables} from './miserables';
import * as d3 from 'd3';

@Component({
  selector: 'app-check',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
    <svg width="960" height="600">
    </svg>
  `,
})
export class CheckComponent implements OnInit, AfterViewInit, OnDestroy{
  name:string;
  svg;
  color;
  simulation;
  link;
  node;
  circle;
  constructor() {
    this.name = 'Angular2'
  }
  
  ngOnInit(){
    
  }
  
  ngAfterViewInit(){
    this.svg = d3.select("svg");
    
    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    
    this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d["id"]; }).distance(70))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    this.render(miserables);
  }
  
  ticked() {
    this.link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    this.node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
   
        this.circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
  }
  
  render(graph){

//      this.svg.append("g").attr('class', 'circle');

// this.circle.append('text')
//                           .attr('x', 30)
//                           .attr('y',65)
//                           .attr('dx',10)
//                           .text('this is the text');
this.circle = this.svg.append('svg:g').selectAll('g');

    this.link = this.svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("stroke","rgb(236, 134, 17)");

    this.node = this.svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .text(function (d) { return d.id; })
    .data(graph.nodes)
    .enter().append("circle")
    
      .attr('stroke','#008080')
      .attr('class','ourmission')
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y })
      .attr("r", 25)
      .attr("text", (d) => d.id)
      .attr("fill", (d)=> { return this.color(d.group); })
      .call(d3.drag()
          .on("start", (d)=>{return this.dragstarted(d)})
          .on("drag", (d)=>{return this.dragged(d)})
          .on("end", (d)=>{return this.dragended(d)}));

    this.node.append("title")
      .text(function(d :any) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);  
  }
  
  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy(){
    
  }
}