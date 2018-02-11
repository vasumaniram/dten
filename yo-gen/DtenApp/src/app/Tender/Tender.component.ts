import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TenderService } from './Tender.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Tender',
	templateUrl: './Tender.component.html',
	styleUrls: ['./Tender.component.css'],
  providers: [TenderService]
})
export class TenderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          tenderId = new FormControl("", Validators.required);
        
  
      
          endDate = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          participants = new FormControl("", Validators.required);
        
  
      
          winner = new FormControl("", Validators.required);
        
  
      
          organizer = new FormControl("", Validators.required);
        
  


  constructor(private serviceTender:TenderService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          tenderId:this.tenderId,
        
    
        
          endDate:this.endDate,
        
    
        
          type:this.type,
        
    
        
          participants:this.participants,
        
    
        
          winner:this.winner,
        
    
        
          organizer:this.organizer
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTender.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.dten.model.Tender",
      
        
          "tenderId":this.tenderId.value,
        
      
        
          "endDate":this.endDate.value,
        
      
        
          "type":this.type.value,
        
      
        
          "participants":this.participants.value,
        
      
        
          "winner":this.winner.value,
        
      
        
          "organizer":this.organizer.value
        
      
    };

    this.myForm.setValue({
      
        
          "tenderId":null,
        
      
        
          "endDate":null,
        
      
        
          "type":null,
        
      
        
          "participants":null,
        
      
        
          "winner":null,
        
      
        
          "organizer":null
        
      
    });

    return this.serviceTender.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "tenderId":null,
        
      
        
          "endDate":null,
        
      
        
          "type":null,
        
      
        
          "participants":null,
        
      
        
          "winner":null,
        
      
        
          "organizer":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.dten.model.Tender",
      
        
          
        
    
        
          
            "endDate":this.endDate.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "participants":this.participants.value,
          
        
    
        
          
            "winner":this.winner.value,
          
        
    
        
          
            "organizer":this.organizer.value
          
        
    
    };

    return this.serviceTender.updateAsset(form.get("tenderId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceTender.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceTender.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tenderId":null,
          
        
          
            "endDate":null,
          
        
          
            "type":null,
          
        
          
            "participants":null,
          
        
          
            "winner":null,
          
        
          
            "organizer":null 
          
        
      };



      
        if(result.tenderId){
          
            formObject.tenderId = result.tenderId;
          
        }else{
          formObject.tenderId = null;
        }
      
        if(result.endDate){
          
            formObject.endDate = result.endDate;
          
        }else{
          formObject.endDate = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.participants){
          
            formObject.participants = result.participants;
          
        }else{
          formObject.participants = null;
        }
      
        if(result.winner){
          
            formObject.winner = result.winner;
          
        }else{
          formObject.winner = null;
        }
      
        if(result.organizer){
          
            formObject.organizer = result.organizer;
          
        }else{
          formObject.organizer = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "tenderId":null,
        
      
        
          "endDate":null,
        
      
        
          "type":null,
        
      
        
          "participants":null,
        
      
        
          "winner":null,
        
      
        
          "organizer":null 
        
      
      });
  }

}
