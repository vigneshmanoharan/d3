import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

@Component({
  selector: 'app-withname',
  templateUrl: './withname.component.html',
  styleUrls: ['./withname.component.scss']
})
export class WithnameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loader();
  }

  public loader(){

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d:any) { return d.id; }).distance(150))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("/assets/miserables.json", function(error, data: any) {
  if (error) throw error;
  const nodes: Node[] = [];
  const links: Link[] = [];

  data.nodes.forEach((d) => {
    nodes.push(<Node>d);
  });

  data.links.forEach((d) => {
    links.push(<Link>d);
  });
  const graph: Graph = <Graph>{ nodes, links };
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke","rgb(236, 134, 17)")
      .attr("stroke-width", function(d :any) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    
  var circles = node.append("circle")
      .attr("r", 5)
      .attr("fill", function(d:any):any { return color(d.group); });
      svg.selectAll('circle').call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

  var lables = node.append("text")
      .text(function(d :any) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d: any) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force<d3.ForceLink<any, any>>('link')
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d : any) { return d.source.x; })
        .attr("y1", function(d : any) { return d.source.y; })
        .attr("x2", function(d : any) { return d.target.x; })
        .attr("y2", function(d : any) { return d.target.y; });

    node
        .attr("transform", function(d : any) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
  }
}
