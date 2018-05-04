import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Contact, Contacts, ContactFindOptions, ContactFieldType, ContactName, ContactField } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    contacts: Contact[] = [];
    error: string;
    
    constructor(public navCtrl: NavController,
            private contactsService: Contacts,
            public alertCtrl: AlertController
  ) {}
  
  findContacts() {
 const options = new ContactFindOptions();
 options.filter = 'John';
 options.multiple = true;
 options.hasPhoneNumber = true;
 const fields: ContactFieldType[] = ['name'];
 this.contactsService.find(fields, options)
   .then(v => this.contacts = v)
   .catch(error => {
     this.error = error;
     this.alertCtrl.create({
       title: 'ERROR',
       subTitle: JSON.stringify(error),
       buttons: ['OK']
     }).present();

   });
}

createContact() {
 let contact: Contact = this.contactsService.create();

 contact.name = new ContactName(null, 'Smith', 'John');
 contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
 contact.save().then(
   () => console.log('Contact saved!', contact),
   (error: any) => {
     this.error = error;
     this.alertCtrl.create({
       title: 'ERROR',
       subTitle: JSON.stringify(error),
       buttons: ['OK']
     }).present();
   }
 );
}

pickContact() {
 this.contactsService.pickContact()
   .then(v => this.contacts = [v])
   .catch(error => {
     this.error = error;
     this.alertCtrl.create({
       title: 'ERROR',
       subTitle: JSON.stringify(error),
       buttons: ['OK']
     }).present();

   });
}

}
