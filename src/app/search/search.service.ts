import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    app_id:string = "housemanager-zblhe";
    admin_email:string = "admin@system.com";
    admin_password:string = "admin1234";

    constructor(private router: Router){}

    async queryHomesFromMainPage(rawQuery:any){
        console.log(rawQuery);
        let price =  {$gte: rawQuery.minPrice, $lte: rawQuery.maxPrice}
        let size = {$gte: rawQuery.minSize, $lte: rawQuery.maxSize}
        const app = new Realm.App({id: this.app_id});
        let mongo = app.currentUser?.mongoClient("mongodb-atlas");
        let collection = mongo?.db("home-maker").collection("homes");
        const results = collection?.find({"city": rawQuery.city, "type": rawQuery.type, "price": price, "size": size});
        await results?.then(res => {
            this.router.navigate(["/allhomes", {data: res}]);
        })
        
    }
}