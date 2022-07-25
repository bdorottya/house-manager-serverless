import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from 'src/app/data-models/file-upload.model';
import { UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-after-first-login',
  templateUrl: './after-first-login.component.html',
  styleUrls: ['./after-first-login.component.scss']
})
export class AfterFirstLoginComponent implements OnInit {

  isLinear = false;
  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/firstlogin"
  email:string = "";
  firstName:string = "";
  lastName:string = "";

  image = "../../../assets/img/no-img.jpg";

  phoneForm = new FormGroup({
    phone: new FormControl(''),
    avatar: new FormControl('')
  })

  phoneNumber = this.phoneForm.get("phone")?.value;

  selectedFile!:File;
  downloadURL?: Observable<string>;
  fb:any;
  file?:FileUpload;

  constructor(private httpClient: HttpClient, private router: ActivatedRoute, private routerr: Router, private storage: AngularFireStorage, private userService: UserService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.email = params['email'];
    });
    let res = this.httpClient.get<UserDAO>(this.baseUrl, {params: {email: this.email}});
    res.subscribe(data => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
    })
  }
  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    let emailShort = this.email.split('@')[0];
    let date = new Date();
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
  }

  uploadImageToStorage(file: FileUpload){
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
    ).subscribe();
  }

  submitForm(){
    let phone = this.phoneForm.get("phone")?.value;
    let avatar = this.file?.url;
    if( !phone && !avatar){
      return;
    }
    this.userService.updateUser(this.email, {avatar: avatar, phone: phone}).then(() => {
      this.routerr.navigateByUrl('/login');
    });



  }

}
