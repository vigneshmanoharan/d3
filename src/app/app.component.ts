import { Component, OnInit } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    // const N = APP_CONFIG.N,
    //       getIndex = number => number - 1;
    // console.log(getIndex);
    // /** constructing the nodes array */
    // for (let i = 1; i <= N; i++) {
    //   this.nodes.push(new Node(i));
    // }

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }
    
  }
  ngOnInit(){
    console.log(this.nodes);
    console.log(this.links);



  }

  
}
