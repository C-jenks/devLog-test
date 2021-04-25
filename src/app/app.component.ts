import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  title = 'devLog-test';
  ticketsForm: FormGroup;
  inProgressFiltered = []
  doneFiltered = []

  ngOnInit(){
    this.populateExampleTickets();
  }

  createForm(): void {
    this.ticketsForm = this.fb.group({
      searchTerm:'',
      inProgress: this.fb.array([]),
      done: this.fb.array([])
    });

    this.onChanges();
  };

  onChanges(): void {
    this.ticketsForm.get('searchTerm').valueChanges.subscribe(val => {
      this.filterTickets(val)
    });
  }

  populateExampleTickets(): void {
    let inProgressControl = <FormArray>this.ticketsForm.get('inProgress');
    // let doneControl = <FormArray>this.ticketsForm.get('done');

    // let exampleInProgress =  this.fb.group({
    //   title: 'Example ticket',
    //   description: 'This is an example ticket.',
    //   done: false
    // });

    // let exampleDone =  this.fb.group({
    //   title: 'Example ticket',
    //   description: 'This is an example ticket.',
    //   done: true
    // });

    // inProgressControl.push(exampleInProgress);
    // inProgressControl.push(exampleInProgress);
    // inProgressControl.push(exampleInProgress);
    // doneControl.push(exampleDone);

    let exampleInProgress =  this.fb.group({
      title: '',
      description: '',
      done: false
    });
    inProgressControl.push(exampleInProgress);

    this.filterTickets();
  }

  addTicket(): void{
    let inProgressControl = <FormArray>this.ticketsForm.get('inProgress');

    let newTicket =  this.fb.group({
      title: '',
      description: '',
      done: false
    });

    inProgressControl.push(newTicket);

    // reset filter to show new ticket
    (<HTMLInputElement>document.getElementById('search')).value = '';
    this.filterTickets();
  }

  deleteTicket(index, arrayName): void {
    let control = <FormArray>this.ticketsForm.get(arrayName);
    control.removeAt(index);

    this.filterTickets();
  }

  markAsDone(index): void {
    let inProgressControl = <FormArray>this.ticketsForm.get('inProgress');
    let doneControl = <FormArray>this.ticketsForm.get('done');

    let tempTicket =  this.fb.group({
      title: this.ticketsForm.value.inProgress[index].title,
      description: this.ticketsForm.value.inProgress[index].description,
      done: true
    });

    doneControl.push(tempTicket);
    inProgressControl.removeAt(index);

    this.filterTickets();
  }

  moveToInProgress(index): void {
    let inProgressControl = <FormArray>this.ticketsForm.get('inProgress');
    let doneControl = <FormArray>this.ticketsForm.get('done');

    let tempTicket =  this.fb.group({
      title: this.ticketsForm.value.done[index].title,
      description: this.ticketsForm.value.done[index].description,
      done: false
    });

    inProgressControl.push(tempTicket);
    doneControl.removeAt(index);

    this.filterTickets();
  }

  filterTickets(val=''): void {
    this.inProgressFiltered = []
    this.doneFiltered = []

    if(val!=''){
      for (let i = 0; i < this.ticketsForm.value.inProgress.length; i++) {
        if(this.ticketsForm.value.inProgress[i].title.toLowerCase().includes(val.toLowerCase())){
          this.inProgressFiltered.push(i)
        }
      }
      for (let i = 0; i < this.ticketsForm.value.done.length; i++) {
        if(this.ticketsForm.value.done[i].title.toLowerCase().includes(val.toLowerCase())){
          this.doneFiltered.push(i)
        }
      }
    }else if(this.ticketsForm.value.searchTerm!=''){
      for (let i = 0; i < this.ticketsForm.value.inProgress.length; i++) {
        if(this.ticketsForm.value.inProgress[i].title.toLowerCase().includes(this.ticketsForm.value.searchTerm.toLowerCase())){
          this.inProgressFiltered.push(i)
        }
      }
      for (let i = 0; i < this.ticketsForm.value.done.length; i++) {
        if(this.ticketsForm.value.done[i].title.toLowerCase().includes(this.ticketsForm.value.searchTerm.toLowerCase())){
          this.doneFiltered.push(i)
        }
      }
    }else{
      for (let i = 0; i < this.ticketsForm.value.inProgress.length; i++) {
        this.inProgressFiltered.push(i)
      }
      for (let i = 0; i < this.ticketsForm.value.done.length; i++) {
        this.doneFiltered.push(i)
      }
    }
  }

}
