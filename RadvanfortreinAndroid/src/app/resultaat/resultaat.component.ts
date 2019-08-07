import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Inzet } from '../domain/Inzet/inzet';
import { InzetService } from '../services/inzet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpelerService } from '../services/speler.service';
import { Speler } from '../domain/Speler/speler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultaat',
  templateUrl: './resultaat.component.html',
  styleUrls: ['./resultaat.component.css']
})
export class ResultaatComponent implements OnInit {
  @Output () puntenChange = new EventEmitter<string>();

  inzetten: Inzet[];
  spelers: Speler[];
  speler: Speler;
  spelerId = 3;
  inzettenArray: Inzet[];
  totaalPunten: number;
  resultaat: boolean;
  clicked: boolean[] = [false];

  constructor(
    private inzetService: InzetService,
    private spelerService: SpelerService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.inzetService.retrieveAll().subscribe(
    //   (inzetten: Inzet[]) => {
    //     this.inzetten = inzetten
    //   },
    //   (error = HttpErrorResponse) => {
    //     console.log(error);
    //   },
    //   () => { }
    // )

    this.spelerService.retrieveById(this.spelerId).subscribe(
      (speler: Speler) => {
        this.speler = speler;
        this.inzettenArray = speler.inzetten;
        console.log(JSON.stringify(this.speler.inzetten));
        this.totaalPunten = speler.totaalPunten;
        console.log(JSON.stringify(this.speler.totaalPunten));
      },

      (error = HttpErrorResponse) => {
        console.log(error);
      },
      () => {
        for (var i = 0; i < this.inzettenArray.length; i++) {
          this.clicked[i] = false;
        }
      }
    )
  }
  ResultaatClick(inzet, index) {
    this.resultaat = inzet.inzetTeLaat == inzet.game.trein.teLaat;
    if (this.resultaat) {
      if (!this.clicked[index]) {
        this.UpdatePunten(inzet, index)
        this.clicked[index] = true;
      } else{}
    }
    else { }
  }

  UpdatePunten(inzet, index) {
    this.spelerService.updatePunten(this.speler.id, this.inzettenArray[(index)].teWinnenBedrag).subscribe(
      (speler: Speler) => this.speler = speler,
      (fout: HttpErrorResponse) =>
        alert("Er is een fout opgetreden: " +
          fout.error.error.status + " " + fout.error.error + "\n" +
          "\nMessage:\n" + fout.error.message
        ),
      () => {
        //this.router.navigate(['redirect', 'resultaat'])
        console.log(JSON.stringify(this.speler.totaalPunten));
        this.reloadPunten();
      }
    )
    
  }

  reloadPunten(){
    this.totaalPunten = this.speler.totaalPunten;
  }

  reload(){
    var container = document.getElementById("puntenDiv");
    var content = container.innerHTML;
    container.innerHTML= content; 
    
   //this line is to watch the result in console , you can remove it later	
    console.log("Refreshed"); 
}

  getInzetten() {
    return this.inzetten;
  }

  getSpeler() {
    return this.speler;
  }
}
