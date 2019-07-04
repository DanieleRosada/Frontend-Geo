import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Output() gridApi: EventEmitter<any> = new EventEmitter<any>();
  @Input() columnDefs : Array<any> = [];
  @Input() rowData : Array<any> = [];
  gridOptions : GridOptions = {rowSelection: "single"}

  constructor() { }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi.emit(params.api);
  }
}
