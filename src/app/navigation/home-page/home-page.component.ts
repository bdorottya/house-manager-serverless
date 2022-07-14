import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

services:any[] = [
  {"name": "Költöztetés", "desc": "A költözésben is segítünk! Keresse bármelyik hitelesített költöztető partnerünket.", "img": "../../../assets/img/moveout.png"},
  {"name": "Ingatlanos megbízása", "desc": "Másra bízná az eladást? Keresse bizalommal ingatlanos kollégáinkat.", "img": "../../../assets/img/ingatlanos.png"},
  {"name": "Könnyen kezelhető felület", "desc": "Weboldalunkon és mobilapplikációnkban is kezelheti ingatlanügyeit, bárhol, bármikor.", "img": "../../../assets/img/app.png"},
  {"name": "Szakember kereső", "desc": "Ellenőrzött, hitelesített szakemberek az ország bármely pontján.", "img": "../../../assets/img/certificate.png"},
  {"name": "Kiemelt hirdetések", "desc": "Találon vevőt 2x olyan gyorsan! Kiemelt hirdetéseink garantáltan hoznak érdeklődőket.", "img": "../../../assets/img/savehome.png"},
  {"name": "Hitelügyintézés", "desc": "Kollégáink rendelkezésére állnak hitelekkel kapcsolatos ügyekben is.", "img": "../../../assets/img/hitel.png"}
];

  constructor() { }

  ngOnInit(): void {
  }

}
