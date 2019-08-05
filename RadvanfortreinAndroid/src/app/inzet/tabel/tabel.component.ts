import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TreinenComponent } from '../../../../src/app/treinen/treinen.component';
import { Trein } from '../../../../src/app/domain/Trein/trein';
import { HttpErrorResponse } from '@angular/common/http';
import { TreinService } from '../../../../src/app/services/trein.service';

// export interface Trein {
//   tijd: string;
//   vertrekstation: string;
//   station: string;  
//   naam: string;
// }

const ELEMENT_DATA: Trein[] = [];

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css']
})
export class TabelComponent implements OnInit{
  @Output() notify: EventEmitter<Trein> = new EventEmitter<Trein>();
  displayedColumns: string[] = ['select', 'tijd', 'vertrekstation', 'treinnaam'];
  selectedEntry : Trein;
  treinen: Trein[];
  selection = new SelectionModel<Trein>(true, []);

  constructor(
    private treinService: TreinService
  ) { }

  ngOnInit() {
    this.treinService.retrieveAll().subscribe(
      (treinen: Trein[]) => this.treinen = treinen,
      (error = HttpErrorResponse) => {
        console.log(error);
      },
      () => {}
    )
  }


  onSelectionChange(entry) {
    this.selectedEntry = entry;
    this.notify.emit(this.selectedEntry);
    // console.log(this.selectedEntry);
  }

  submit() {
    console.log(this.selectedEntry.naam);
  }
}

