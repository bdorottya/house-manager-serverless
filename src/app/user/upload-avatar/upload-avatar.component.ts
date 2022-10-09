import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, first } from 'rxjs';
import { FileUpload } from 'src/app/data-models/file-upload.model';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UploadAvatarComponent>, private snackBar: MatSnackBar, private httpClient: HttpClient, private storage: AngularFireStorage, @Inject(MAT_DIALOG_DATA) public data: {email: string, image: string}) { }

  selectedFile!: File;

  file!:FileUpload;

  previewImage:string = "../../../assets/img/no-img.jpg";

  updateuserUrl="https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/updateUser";

  _userType:any;

  ngOnInit(): void {

    this.previewImage = this.data.image;
  }

  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    let date = new Date();
    let emailShort = this.data.email.split('@')[0];
    let filePath = `avatars/${emailShort}_${date}`;
    console.log(filePath);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImage = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    let file = new FileUpload(this.selectedFile);
    file.name = filePath;
    this.file = file;
    console.log(this.file);
  }

  submit(file:FileUpload){
    console.log(file);
    const filepath = file.name;
    const storageRef = this.storage.ref(filepath);
    const upload = this.storage.upload(filepath, file.file);
    upload.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(url => {
        file.url = url;
        this.file = file;
        console.log(file.url);
      });
    })
    ).subscribe(data => {
      if(data){
        console.log(data);
        let body = {
          email: this.data.email,
          avatar: this.file.name
        }
        console.log(body);
        this.httpClient.post<any>(this.updateuserUrl, body).subscribe(obs => {
          if(obs){
            this.dialogRef.close(obs);
          }else{
            console.log("error");
          }
        })
        }
    });
  }
}
