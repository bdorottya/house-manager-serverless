import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BSON } from 'realm-web';
import { ExpertService } from '../expert.service';

@Component({
  selector: 'app-modify-prices',
  templateUrl: './modify-prices.component.html',
  styleUrls: ['./modify-prices.component.scss']
})
export class ModifyPricesComponent implements OnInit {

  app_id:string = "housemanager-zblhe";

  priceForm:FormGroup = new FormGroup({
    serviceName: new FormControl(''),
    price: new FormControl('')
  });

  services:any[] = [];

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private expertService: ExpertService, private dialogRef: MatDialogRef<ModifyPricesComponent>) { }

  ngOnInit(): void {
    let id = localStorage.getItem("userID") as string;
    const expert = this.expertService.getExpert(id);
    expert.then(data => {
      console.log(data);
      this.services = data.prices;
    })
  }

  addPrice(){
    if(this.priceForm.valid){
      let serviceName = this.priceForm.get("serviceName")?.value;
      let price = this.priceForm.get("price")?.value;
      let service = {
        service: serviceName,
        price: price
      }
      if(this.services && this.services.length>0){
        let index = this.services.findIndex(s => s.service === service.service);
        console.log(index);
        if(index > -1){
          console.log(service)
          this.services[index] = service;
          this.priceForm.reset();
        }else{
          console.log(service)
          this.services.push(service);
          console.log(this.services);
          this.priceForm.reset();
        }
      }else{
        this.services = [];
        this.services.push(service);
        console.log(this.services);
        this.priceForm.reset();
      }

    }
  }

  editPrice(service:any){
    this.priceForm.get("serviceName")?.setValue(service.service);
    this.priceForm.get("price")?.setValue(service.price);
  }

  closeAndSave(){
    let id = localStorage.getItem("userID") as string;
    let newId = new BSON.ObjectID(id);
    let res = this.expertService.updatePrices(newId,this.services);
    res.then(data => {
      if(data){
        this.snackBar.open("Szolgáltatások módosítása sikeres!", "OK", {panelClass: 'success-snackbar'});
        this.closeWithoutSave();
      }
    })
  }

  closeWithoutSave(){
    this.services = [];
    this.dialogRef.close();
  }

}
