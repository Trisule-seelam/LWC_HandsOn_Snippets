import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ErrorValidationUtility extends LightningElement {
    name = '';
    email = '';
    phone = '';
    age ='';
    errorDetails = [];

    handleInputChange(event) {
        const input = event.target.dataset.input;
        this[input] = event.target.value;
    }

    validateInput() {
        var errors = [];
        const regexForName = /^[a-zA-Z\s]+$/;
        const regexForEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
        const regexForPhone = /^\d{10}$/;

        if(!this.name || !this.email) {
            errors.push({input: 'Missing Required Fields', message: 'Name and Email are required fields.'});
        }
        if(this.name && !regexForName.test(this.name.trim())) {
            errors.push({input: 'Invalid Name', message: 'Enter a valid name.'});
        }
        if(this.email && !regexForEmail.test(this.email)) {
            errors.push({input: 'Invalid Email', message: 'Enter a valid email address.'});
        }
        if(this.phone && !regexForPhone.test(this.phone)) {
            errors.push({input: 'Invalid Phone', message: 'Enter a valid 10-digit phone number.'});
        }
        if(this.age && (isNaN(this.age) || this.age < 1 || this.age > 100)) {
            errors.push({input: 'Invalid Age', message: 'Enter a valid age between 1 and 100.'});
        }
        
        return errors;
    }

    handleSubmit() {
        this.errorDetails = this.validateInput();

        if(this.errorDetails.length > 0) {
            console.error('Validation Errors: ' + JSON.stringify(this.errorDetails));
            this.showToastMessage('Error', this.errorDetails.map(err => `${err.input}: ${err.message}`).join(' | '), 'error');
        } else {
            this.showToastMessage('Success', 'Form submitted successfully!', 'success');
            this.resetInputs();
        }
    }

    resetInputs() {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.age = '';
    }

    showToastMessage(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }

}