import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  @Input() buses;
  center: Array<number> = [45.951288, 12.631917];
  zoom: number = 10;
  styleMap = [
    {
      "stylers": [
        {
          "hue": "#ff1a00"
        },
        {
          "invert_lightness": true
        },
        {
          "saturation": -100
        },
        {
          "lightness": 33
        },
        {
          "gamma": 0.5
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2D333C"
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
