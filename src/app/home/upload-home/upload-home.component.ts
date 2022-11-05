import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioButton } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectId } from 'mongodb';
import { BSON } from 'realm-web';
import { FileUpload } from 'src/app/data-models/file-upload.model';
import { HomeArray } from '../home.constants';
import { HomeDAO } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-upload-home',
  templateUrl: './upload-home.component.html',
  styleUrls: ['./upload-home.component.scss']
})
export class UploadHomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<UploadHomeComponent>, private homeService: HomeService, private httpClient: HttpClient, private fb: FormBuilder) { }

  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/addUploadedHome"

  homeType!:string;
  city!:string;
  selectedFiles!: FileList;
  imagesToShow: string[] = [];
  filesToUpload: FileUpload[] = [];
  noImage = "../../../assets/img/no-img.jpg";
  imageUrls:string[] = [];

  imagesForUpdate:string[] = [];;

  oId:ObjectId= new BSON.ObjectId();



  uploadHome!:FormGroup;

  city2:any;
  buildingType:any;
  condition: any;
  heating: any;
  parking: any;
  yesno: any;

  editableHome!:HomeDAO;

  ngOnInit(): void {
    this.city2 = HomeArray.city2;
    this.buildingType = HomeArray.buildingType;
    this.condition = HomeArray.conditions;
    this.heating = HomeArray.heating;
    this.parking = HomeArray.parking;
    this.yesno = HomeArray.yesno;

    this.uploadHome = this.fb.group({
      type: [''],
      city: ['', [Validators.required]],
      city2: [''],
      street: [''],
      buildingType: [''],
      levelsInBuilding: [''],
      condition: [''],
      level: [''],
      size: [''],
      price: [''],
      bedroom: [''],
      bathroom: [''],
      heatingType: [''],
      parking: [''],
      elevator: [''],
      balcony: [''],
      garden: [''],
      attic: [''],
      ac: [''],
      pet: [''],
      smoke: [''],
      description: [''],
      images: ['']
    });

    if(this.editableHome){
      console.log(this.editableHome);
      this.uploadHome.patchValue(this.editableHome);
      if(this.editableHome.images){
        this.imagesToShow = this.editableHome.images;
      }
      console.log(this.uploadHome.value);
      console.log(this.uploadHome);
      this.uploadHome.get("type")?.disable();
      if(this.editableHome.type === "elado"){
        this.uploadHome.get("type")?.setValue('elado');
      }else{
        this.uploadHome.get("type")?.setValue('kiado');
      }
    }
  }

  uploadFiles(event:any){
    let oId = new BSON.ObjectId();
    this.oId=oId;
    console.log(event);
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    let length = this.selectedFiles.length;
    this.imagesToShow = [];
    for(let i = 0; i <= length; i++){
      let file = this.selectedFiles[i];
      let userID = localStorage.getItem("userID") as string;
      let time = new Date().getUTCMinutes();
      let fileName="img_" + i;
      let filePath = `homes/${oId}/${fileName}`;
      console.log(filePath);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.imagesToShow.push(e.target.result);
        console.log(this.imagesToShow);
      };
      if(file){
        reader.readAsDataURL(file as Blob);
        let fileToUpload = new FileUpload(file);
        fileToUpload.name = filePath;
        console.log(fileToUpload);
        this.filesToUpload.push(fileToUpload);
      }else{
        console.log("no file!?", file);
      }


    }
  }

  removeImage(image:string){
    console.log("remove");
    console.log(image);
    const index = this.imagesToShow.indexOf(image);
    console.log(index);
    if(index > -1){
      console.log("index found");
      this.imagesToShow.splice(index,1);
      this.filesToUpload.splice(index,1);
      console.log(this.imagesToShow);
    }
  }

  deleteHome(homeId:ObjectId){
    this.homeService.deleteHome(homeId).then(data => {
      console.log(data);
      this.snackBar.open("Ingatlan törlése sikeres!", "OK", {panelClass: 'success-snackbar'});
      this.dialogRef.close();
    })
  }

  submitUpload(){
    if(this.uploadHome.valid){
      if(this.editableHome){
        this.homeService.updateHome(this.editableHome._id, this.uploadHome.value).then(data => {
          if(data){
            
            this.dialogRef.close();
            this.snackBar.open("Ingataln adatainak módosítása sikeres", "OK", {panelClass: 'success-snackbar'});
            return;
          }
        });
      }else{
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
        let airCond = this.uploadHome.get("ac")?.value;
        let pet = this.uploadHome.get("pet")?.value;
        let smoke = this.uploadHome.get("smoke")?.value;
        let price = this.uploadHome.get("price")?.value;
        let description = this.uploadHome.get("description")?.value;

        let home = new HomeDAO();
        home._id = this.oId;
        home.ac = airCond;
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
        home.heatingType = heatingType;
        home.level = level;
        home.size = size;
        home.parking = parking;
        home.pet = pet;
        home.smoke = smoke;
        home.price = price;

        let id = localStorage.getItem("userID") as string;
        home.uploader = new BSON.ObjectId(id);
        console.log(localStorage.getItem("userID"));
        let res = this.homeService.uploadHome(home, this.filesToUpload);
        res.then(() => {
          console.log("done");
          this.uploadHome.reset();
          this.dialogRef.close();
        })
      }
    }


  }

}
