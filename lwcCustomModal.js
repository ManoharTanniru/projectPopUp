import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import PROJECT_OBJECT from '@salesforce/schema/Project__c';
import PROJECT_NAME from '@salesforce/schema/Project__c.Name';
import PROJECT_TYPE from '@salesforce/schema/Project__c.Project_Type__c';
import START_DATE from '@salesforce/schema/Project__c.Start_Date__c';
import END_DATE from '@salesforce/schema/Project__c.End_Date__c';
import PRIORITY from '@salesforce/schema/Project__c.Priority__c';
import ESTIMATED_COST from '@salesforce/schema/Project__c.Estimated_Cost__c';
import AddMembers from '@salesforce/schema/Project__c.Add_Members__c';
import Description from '@salesforce/schema/Project__c.Description__c';


//let Name = NAME_FIELD;

export default class LwcCustomModal extends NavigationMixin(LightningElement) {
// Open and close model
    @track customFormModal = false;
    
    customShowModalPopup() {
        this.customFormModal = true;
    }

    customHideModalPopup() {
        this.customFormModal = false;
    }






    // handleButtonClickOnSave() {
    //     const event = new ShowToastEvent({
    //         title: 'Success!',
    //         message: `Project created successfully`, //  `Project ${PROJECT_NAME} was created.` 
    //         variant: 'success',
            
    //     });
    //     this.dispatchEvent(event);
    // }


    handleButtonClickOnSave(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!',
            message: `Project created successfully`, //  `Project ${PROJECT_NAME} was created.` 
            variant: 'success',
        }));
    }







//       // wiring the field of picklist type to retrieve data in custom form
//   @wire(getPicklistValues,{
//     recordTypeId:'012000000000000AAA',
//     fieldApiName:PRIORITY
// })priorityValues;


// @wire(getPicklistValues,{
//     recordTypeId:'012000000000000AAA',
//     fieldApiName:PROJECT_TYPE
// })projectTypeValues;




    saveRecord(){
        this.template.querySelector('lightning-record-edit-form').submit(this.fields); //this.inputFields
        this.customFormModal=false;
                // this[NavigationMixin.Navigate]({
                //   type: 'standard__recordPage',
                //   attributes: {
                //       //recordId: this.projectIdForNavigation,
                //       objectApiName: 'PROJECT_OBJECT',
                //       actionName: 'view'
                //   },
                // });

                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Project__c',
                        actionName: 'list'
                    },
                    state: {
                        // 'filterName' is a property on the page 'state'
                        // and identifies the target list view.
                        // It may also be an 18 character list view id.
                        filterName: 'Recent' // or by 18 char '00BT0000002TONQMA4'
                    }
                });
                
                
                
     }



     









    saveRecordAndNew(){
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: 'Project__c',
        //         actionName: 'list'
        //     },
        //     state: {
        //         // 'filterName' is a property on the page 'state'
        //         // and identifies the target list view.
        //         // It may also be an 18 character list view id.
        //         filterName: 'Recent' // or by 18 char '00BT0000002TONQMA4'
        //     }
        // });

        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if(inputFields){
            inputFields.forEach(field => {
                field.reset();
            }); 
            
        

        

           

        
        
        }
          
    }






   

    // toast(title) {
    //     const toastEvent = new showToastEvent({
    //         title,
    //         varient: "successful"
    //     })
    //     this.dispatchEvent(toastEvent)
    // }


    

    @api
  recordId; //Record Id will be dynamically pushed to this property

  get acceptedFormats() {
    return [".pdf", ".png", ".xlsx", ".xls", ".csv", ".doc", ".docx"]; //what ever formats are mentioned here only they can be uploaded
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files;
    console.log(uploadedFiles.length);
  }










    
}



