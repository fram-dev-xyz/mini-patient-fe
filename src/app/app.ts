import { Component, signal, OnInit } from '@angular/core';
import { PatientApp } from './patient-app';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule, ReactiveFormsModule]
})


export class App implements OnInit{
  patients: any[] = [];
  patientDetails: any = null;
  searchByPatientId:string = "";
  searchByName:string = "";
  totalPages:number = 0;
  currentPage: number = 0;
  showAddForm = false;
  showEditForm = false;
  states: any[] = [];
  suburbs: any[] = [];

  newPatient = {
    patientId: '',
    firstName: '',
    lastName:'',
    dateOfBirth: '',
    gender: '',
    address: '',
    stateId:null,
    suburbId:null,
    postcode:'',
    phoneNumber:''
  };
  
  constructor(private patientApp: PatientApp) { }
  ngOnInit(): void {
    this.loadTableData();
    this.loadStates();
  }

  viewPatient(id: number) {
    this.patientApp.getSingleRecord(id).subscribe(
      data => {
        this.patientDetails = data;
      }
    );
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientApp.deleteData(id).subscribe(
        () => {
          this.loadTableData();
        }
      );
    }
  }

  searchPatient(page: number){
    console.log(this.searchByPatientId);
    this.patientApp.searchData(this.searchByPatientId, this.searchByName, page).subscribe(
      data => {
        this.patients = data.content;
        this.currentPage = data.pageable.pageNumber;
        this.totalPages = data.totalPages;
      }
    );
  }

  createPatient() {
    if(this.showAddForm){
      this.patientApp.addData(this.newPatient).subscribe(
        ()=>{
          this.toggleAddForm();
          this.loadTableData();
        }
      );
    }

    if(this.showEditForm){
      this.patientApp.editData(this.newPatient).subscribe(
        ()=>{
          this.toggleEditForm(0);
          this.loadTableData();
        }
      );
    }
  }

  closeDetail(): void {
    this.patientDetails = null;
  }

  loadTableData(): void {
    this.searchPatient(0);
  }


  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.searchPatient(page);
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
    if (!this.showAddForm) {
      this.newPatient = { patientId: '', firstName: '', lastName:'', dateOfBirth: '', gender: '', address: '', postcode:'',stateId:null, suburbId:null,phoneNumber:'' };
    }
  }

  toggleEditForm(id: number = 0) {
    this.showEditForm = !this.showEditForm;
    this.showAddForm = false;
    if (!this.showEditForm) {
      this.newPatient = { patientId: '', firstName: '', lastName:'', dateOfBirth: '', gender: '', address: '', postcode:'',stateId:null, suburbId:null,phoneNumber:'' };
    }else{
      this.patientApp.getSingleRecord(id).subscribe(
      data => {
        this.newPatient = data;
      }
    );
    }
  }

  //resource section
  loadStates() {
    this.patientApp.loadStates().subscribe(
      data=>{
        this.states = data;
      }
    );
  }

  onStateChange(event: Event) {
    const stateId = Number((event.target as HTMLSelectElement).value);
    if (stateId) {
      this.patientApp.loadSuburb(stateId).subscribe(data => {
        this.suburbs = data.suburbs;
        this.newPatient.suburbId = null;
      });
    } else {
      this.suburbs = [];
    }
  }
}
