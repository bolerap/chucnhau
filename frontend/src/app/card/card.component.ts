import "rxjs/add/operator/switchMap";

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  imagePath = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    let fileId = this.route.snapshot.paramMap.get("path");

    // build path from response data
    this.imagePath = `download/${fileId}.png`;

    console.log('ngOnInit: ', this.imagePath);

    // this.route.params
    //   .switchMap((params: Params) => {
    //     let fileId = params['path'];
    //
    //     // build path from response data
    //     return this.imagePath = `download/${fileId}.png`;
    //
    //     // console.log('ngOnInit: ', this.imagePath);
    //   });
  }

}
