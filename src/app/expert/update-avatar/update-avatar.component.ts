import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { FileUpload } from 'src/app/data-models/file-upload.model';
import { User } from 'src/app/user/socialUser.model';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateAvatarComponent>, private storage: AngularFireStorage, private httpClient: HttpClient) { }

  updateuserUrl="https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/updateUser";

  avatarForm:FormGroup = new FormGroup({
    avatar: new FormControl('')
  })
  image:string = '../../../assets/img/no-img.jpg';
  selectedFile!: File;
  expert!:User;
  file!: FileUpload;

  ngOnInit(): void {
    if(this.expert.avatar){
      this.image = this.expert.avatar;
    }

  }

  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    let date = new Date();
    let emailShort = this.expert.email.split('@')[0];
    let filePath = `avatars/${emailShort}_${date}`;
    console.log(filePath);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    let file = new FileUpload(this.selectedFile);
    file.name = filePath;
    this.file = file;
    console.log(this.file);
  }

  upload(file:FileUpload){
    console.log(file);
    const filepath = file.name;
    const storageRef = this.storage.ref(filepath);
    const upload = this.storage.upload(filepath, file.file);
    upload.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(url => {
        file.url = url;
        this.file = file;
        console.log(file.url);
        let body = {
          email: this.expert.email,
          avatar: file.url
        }
        console.log(body);
        this.httpClient.post<any>(this.updateuserUrl, body).subscribe(obs => {
          if(obs){
            this.dialogRef.close(obs);
          }else{
            console.log("error");
          }
        })

      });
    })
    ).subscribe(data => {
      console.log(data);
    });
  }

  close(){
    this.dialogRef.close();
  }

}
