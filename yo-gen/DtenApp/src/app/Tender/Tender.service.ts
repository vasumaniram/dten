import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Tender } from '../org.dten.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TenderService {

	
		private NAMESPACE: string = 'org.dten.model.Tender';
	



    constructor(private dataService: DataService<Tender>) {
    };

    public getAll(): Observable<Tender[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Tender> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Tender> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Tender> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Tender> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
