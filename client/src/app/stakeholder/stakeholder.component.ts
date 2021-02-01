import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StakeHolderService, ProjectService, AlertService } from '../_services';
import { StakeHolder, SubContractor } from '../_models/stakeholders.model';
import { User, Project } from '../_models';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component(
	{
		selector: 'stakeholder',
		templateUrl: 'stakeholder.component.html'
	})
export class StakeHolderComponent implements OnInit {

	userProjects: Project[];
	selectedUserProject: Project;
	currentUser: User;
	
	stakeHolder: StakeHolder;
	stakeHolderFormGroup: FormGroup;
	subContractorFormGroup: FormGroup;

	myFormValueChanges$;

	showNewRow = false;
	loading = false;

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private stakeHolderService: StakeHolderService,
		private projectService: ProjectService,
		private alertService: AlertService) { }
		
	ngOnInit() {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.loadAllProjectsForUser();

		this.stakeHolderFormGroup = this.formBuilder.group({
			selectedProject: [[], Validators.required],
			stakeHolderName: ['', Validators.required],
			stakeHolderShortName: [''],
			workOrderNumber: [''],
			subContractors: this.formBuilder.array([])
		});
		this.myFormValueChanges$ = this.stakeHolderFormGroup.controls['subContractors'].valueChanges;

		this.populateProjectArray();

	}

	private loadAllProjectsForUser() {
		this.projectService.getAllProjectForUser(this.currentUser.id).pipe(first()).subscribe(projects => {
		  this.userProjects = projects;
		});
	  }

	private populateProjectArray() {
	// 	//get Current user
	 	let currentUsers = JSON.parse(localStorage.getItem('currentUser'));

	// 	//call service to get project list
		this.projectService.getAllProjectForUser(currentUsers).subscribe(data => this.setProjectArrayForUser(data));
	 	}

	 private setProjectArrayForUser(allUserProjects) {
		//this.projectArray = allUserProjects;
	 }
	

  private getSubContractor() {
    return this.formBuilder.group({
		subContractorName: ['', Validators.required],
		SubContractorShortName: [''],
		workOrderNumber: ['', Validators.required]
    });
  }

  addSubContractor() {
    const control = <FormArray>this.stakeHolderFormGroup.controls['subContractors'];
    control.push(this.getSubContractor());
  }

  removeSubContractor(i: number) {
    const control = <FormArray>this.stakeHolderFormGroup.controls['subContractors'];
    control.removeAt(i);
  }

  clearAllSubContractor() {
    const control = <FormArray>this.stakeHolderFormGroup.controls['subContractors'];
    while(control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    // control.push(this.getNewSubContractor());
  }

	// convenience getter for easy access to form fields
	get f() { return this.stakeHolderFormGroup.controls; }
	

	onSave(eventData: any) {
		this.loading = true;

		let currentProject = JSON.parse(localStorage.getItem('currentProject'));
		this.stakeHolder.selectedProject[0].projectId = currentProject.id;

		this.stakeHolderService.saveOrUpdateStakeHolder(this.stakeHolder)
			.pipe(first())
			.subscribe(
				data => {
					this.alertService.success('Stake Holder update successfull', true);
					this.router.navigate(['stakeholders']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}

	onCancel(eventData: any) {
		this.router.navigate(['dashboard']);
	}

}
