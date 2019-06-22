import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Output() gridApi: EventEmitter<any> = new EventEmitter<any>(); ;
  @Input() columnDefs = [];
  @Input() rowData = [];
  gridOptions = {rowSelection: "single"}

  constructor() { }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi.emit(params.api);
  }
}
