import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Poem} from '../shared/poem';
import {PoemService} from '../shared/poem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poem = new Poem();
  body = '';

  constructor(private poemService: PoemService, private router: Router) {}

  ngOnInit(): void {
    this.poem.body.map(line => this.body += line + '\n');
  }

  generate(): void {
    if (Object.keys(this.poem).length !== 0) {
      // get data from text area to array of string
      this.poem.body = this.body.split("\n");

      // Push data to api
      this.poemService.generate(this.poem)
        .then(resp => {
          console.log(resp);

          // send path to generated image to card component
          this.router.navigate(['/card/', resp.fileId])
        });
    } else {
      console.log('Empty');
    }

  }

}
