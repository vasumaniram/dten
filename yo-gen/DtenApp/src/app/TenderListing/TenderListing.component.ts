import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TenderListingService } from './TenderListing.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TenderListing',
	templateUrl: './TenderListing.component.html',
	styleUrls: ['./TenderListing.component.css'],
  providers: [TenderListingService]
})
export class TenderListingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          listingId = new FormControl("", Validators.required);
        
  
      
          reservePrice = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          state = new FormControl("", Validators.required);
        
  
      
          offers = new FormControl("", Validators.required);
        
  
      
          tender = new FormControl("", Validators.required);
        
  


  constructor(private serviceTenderListing:TenderListingService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          listingId:this.listingId,
        
    
        
          reservePrice:this.reservePrice,
        
    
        
          description:this.description,
        
    
        
          state:this.state,
        
    
        
          offers:this.offers,
        
    
        
          tender:this.tender
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTenderListing.getAll()
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
      $class: "org.dten.model.TenderListing",
      
        
          "listingId":this.listingId.value,
        
      
        
          "reservePrice":this.reservePrice.value,
        
      
        
          "description":this.description.value,
        
      
        
          "state":this.state.value,
        
      
        
          "offers":this.offers.value,
        
      
        
          "tender":this.tender.value
        
      
    };

    this.myForm.setValue({
      
        
          "listingId":null,
        
      
        
          "reservePrice":null,
        
      
        
          "description":null,
        
      
        
          "state":null,
        
      
        
          "offers":null,
        
      
        
          "tender":null
        
      
    });

    return this.serviceTenderListing.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "listingId":null,
        
      
        
          "reservePrice":null,
        
      
        
          "description":null,
        
      
        
          "state":null,
        
      
        
          "offers":null,
        
      
        
          "tender":null 
        
      
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
      $class: "org.dten.model.TenderListing",
      
        
          
        
    
        
          
            "reservePrice":this.reservePrice.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "state":this.state.value,
          
        
    
        
          
            "offers":this.offers.value,
          
        
    
        
          
            "tender":this.tender.value
          
        
    
    };

    return this.serviceTenderListing.updateAsset(form.get("listingId").value,this.asset)
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

    return this.serviceTenderListing.deleteAsset(this.currentId)
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

    return this.serviceTenderListing.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "listingId":null,
          
        
          
            "reservePrice":null,
          
        
          
            "description":null,
          
        
          
            "state":null,
          
        
          
            "offers":null,
          
        
          
            "tender":null 
          
        
      };



      
        if(result.listingId){
          
            formObject.listingId = result.listingId;
          
        }else{
          formObject.listingId = null;
        }
      
        if(result.reservePrice){
          
            formObject.reservePrice = result.reservePrice;
          
        }else{
          formObject.reservePrice = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.state){
          
            formObject.state = result.state;
          
        }else{
          formObject.state = null;
        }
      
        if(result.offers){
          
            formObject.offers = result.offers;
          
        }else{
          formObject.offers = null;
        }
      
        if(result.tender){
          
            formObject.tender = result.tender;
          
        }else{
          formObject.tender = null;
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
      
        
          "listingId":null,
        
      
        
          "reservePrice":null,
        
      
        
          "description":null,
        
      
        
          "state":null,
        
      
        
          "offers":null,
        
      
        
          "tender":null 
        
      
      });
  }

}
