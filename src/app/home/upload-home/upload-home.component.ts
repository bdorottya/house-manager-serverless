import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BSON } from 'realm-web';
import { HomeArray } from '../home.constants';
import { HomeDAO } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-upload-home',
  templateUrl: './upload-home.component.html',
  styleUrls: ['./upload-home.component.scss']
})
export class UploadHomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  homeType!:string;
  city!:string;

  uploadHome = new FormGroup({
    //first expansion - cím, típus
    type: new FormControl(''),
    city: new FormControl(''),
    city2: new FormControl(''),
    street: new FormControl(''),
    buildingType: new FormControl(''),
    condition: new FormControl(''),
    levelsInBuilding: new FormControl(''),
    level: new FormControl(''),
    //second expansion - méret
    size: new FormControl(''),
    bedroom: new FormControl(''),
    bathroom: new FormControl(''),
    //third expansion - további adatok
    heatingType: new FormControl(''),
    elevator: new FormControl(''),
    attic: new FormControl(''),
    garden: new FormControl(''),
    balcony: new FormControl(''),
    pet: new FormControl(''),
    smoke: new FormControl(''),
    airCond: new FormControl(''),
    parking: new FormControl(''),
    //fourth expansion - ár, képek, leírás
    price: new FormControl(''),
    description: new FormControl(''),
    images: new FormControl(''),
  });

  city2:any;
  buildingType:any;
  condition: any;
  heating: any;
  parking: any;
  yesno: any;

  ngOnInit(): void {
    this.city2 = HomeArray.city2;
    this.buildingType = HomeArray.buildingType;
    this.condition = HomeArray.conditions;
    this.heating = HomeArray.heating;
    this.parking = HomeArray.parking;
    this.yesno = HomeArray.yesno;
  }

  submitUpload(){
    let city = this.uploadHome.get("city")?.value;
    let city2 = this.uploadHome.get("city2")?.value;
    let type = this.uploadHome.get("type")?.value;
    let street = this.uploadHome.get("street")?.value;
    let buildingType = this.uploadHome.get("buildingType")?.value;
    let condition = this.uploadHome.get("condition")?.value;
    let levelsInBuilding = this.uploadHome.get("levelsInBuilding")?.value;
    let level = this.uploadHome.get("level")?.value;
    let size = this.uploadHome.get("size")?.value;
    let bedroom = this.uploadHome.get("bedroom")?.value;
    let bathroom = this.uploadHome.get("bathroom")?.value;
    let heatingType = this.uploadHome.get("heatingType")?.value;
    let parking = this.uploadHome.get("parking")?.value;
    let elevator = this.uploadHome.get("elevator")?.value;
    let attic = this.uploadHome.get("attic")?.value;
    let garden = this.uploadHome.get("garden")?.value;
    let balcony = this.uploadHome.get("balcony")?.value;
    let airCond = this.uploadHome.get("airCond")?.value;
    let pet = this.uploadHome.get("pet")?.value;
    let smoke = this.uploadHome.get("smoke")?.value;
    let price = this.uploadHome.get("price")?.value;
    let description = this.uploadHome.get("description")?.value;

    let home = new HomeDAO();
    home.airConditioner = airCond;
    home.attic = attic;
    home.balcony = balcony;
    home.bathroom = bathroom;
    home.bedroom = bedroom;
    home.buildingType = buildingType;
    home.levelsInBuilding = levelsInBuilding;
    home.city = city;
    home.city2 = city2;
    home.condition = condition;
    home.description = description;
    home.elevator = elevator;
    home.garden = garden;
    home.type = type;
    home.street = street;
    home.heating = heatingType;
    home.level = level;
    home.size = size;
    home.parking = parking;
    home.pet = pet;
    home.smoke = smoke;
    home.price = price;

    let id = localStorage.getItem("userID") as string;
    home.uploader = new BSON.ObjectId(id);

    let res = this.homeService.uploadHome(home);

  }

}
