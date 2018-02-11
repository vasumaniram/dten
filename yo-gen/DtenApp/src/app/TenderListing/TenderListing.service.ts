import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TenderListing } from '../org.dten.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TenderListingService {

	
		private NAMESPACE: string = 'org.dten.model.TenderListing';
	



    constructor(private dataService: DataService<TenderListing>) {
    };

    public getAll(): Observable<TenderListing[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<TenderListing> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<TenderListing> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<TenderListing> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<TenderListing> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
