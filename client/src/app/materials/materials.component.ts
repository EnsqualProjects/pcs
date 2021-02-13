import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Material, MaterialIssue, MaterialReturn, MaterialRequest, User, Project } from '../_models';
import { MaterialService, ProjectService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
		selector: 'materialmanagement',
		templateUrl: 'materials.component.html',
		styleUrls: ['./materials.component.css'],
		animations: [
		  trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		  ]),
		],
	})
export class MaterialsComponent implements OnInit {

	userProjects: Project[];
	selectedUserProject: Project;
	currentUser: User;

	materials: Material[] = [];
	material: Material;

	issueMaterialFormGroup: FormGroup;
	requestMaterialFormGroup: FormGroup;
	returnMaterialFormGroup: FormGroup;

	// materialIssueArray: MaterialIssue[] = [];
	materialIssue: MaterialIssue;
	materialReturn: MaterialReturn;
	materialRequest: MaterialRequest;

	state: String;
	materialSelectedFlag: boolean = false;

	loading = false;

	public dataSource = new MatTableDataSource<Material>();

	//displayedMaterialColumns: string[] = ['Project Id', 'Name', 'Discipline', 'Type/Category', 'PO Number', 'Descripition', 'Make', 'Model', 'Received Quantity', 'Spare Quantity', 'Total Quantity', 'UOM', 'Courier Number', 'Gate Pass Number', 'Receive Date', 'Remark'];
	displayedMaterialColumns: string[] = ['Check', 'Discipline', 'Type/Category', 'PO Number', 'Descripition', 'Make', 'Model', 'Received Quantity', 'Spare Quantity', 'Total Quantity', 'UOM', 'Courier Number', 'Gate Pass Number', 'Receive Date', 'Remark', 'Details'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private issueMaterialFormBuilder: FormBuilder,
		private requestMaterialFormBuilder: FormBuilder,
		private returnMaterialFormBuilder: FormBuilder,

		private router: Router,
		private materialService: MaterialService,
		private projectService: ProjectService,
		private alertService: AlertService) {

		this.material = new Material();
		this.materialIssue = new MaterialIssue();
		this.materialReturn = new MaterialReturn();
		this.materialRequest = new MaterialRequest();
		this.state = "";

		this.createFormGroup();

	}

	ngOnInit() {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.loadAllProjectsForUser();
	}

	createFormGroup() {
		this.issueMaterialFormGroup = this.issueMaterialFormBuilder.group({
			materialsSelectedForIssue : this.issueMaterialFormBuilder.array([])
		  });

		  this.requestMaterialFormGroup = this.requestMaterialFormBuilder.group({
			materialsSelectedForRequest : this.requestMaterialFormBuilder.array([])
		  });

		  this.returnMaterialFormGroup = this.returnMaterialFormBuilder.group({
			materialsSelectedForReturn : this.returnMaterialFormBuilder.array([])
		  });

		  this.issueMaterialFormGroup.setControl('materialsSelectedForIssue', 
		  this.issueMaterialFormBuilder.array([]));

		  this.requestMaterialFormGroup.setControl('materialsSelectedForRequest', 
		  this.requestMaterialFormBuilder.array([]));

		  this.returnMaterialFormGroup.setControl('materialsSelectedForReturn', 
		  this.returnMaterialFormBuilder.array([]));
	}

	// setIssueMaterials() {
		// this.issueMaterialFormGroup.setControl('materialsSelectedForIssue', 
		// 	this.issueMaterialFormBuilder.array([]));
	//   }

	get materialsSelectedForIssue() : FormArray {
		return this.issueMaterialFormGroup.get('materialsSelectedForIssue') as FormArray
	}

	get materialsSelectedForRequest() : FormArray {
		return this.requestMaterialFormGroup.get('materialsSelectedForRequest') as FormArray
	}

	get materialsSelectedForReturn() : FormArray {
		return this.returnMaterialFormGroup.get('materialsSelectedForReturn') as FormArray
	}

	private loadAllProjectsForUser() {
		this.projectService.getAllProjectForUser(this.currentUser.id).pipe(first()).subscribe(projects => {
			this.userProjects = projects;
		});
	}

	private populateMaterialForSelectedProject() {
		this.materialService.getAllMaterialsForProject(this.selectedUserProject.id).pipe(first()).subscribe(result => {
			//alert(JSON.stringify(materials))
			//this.materials = <Material[]>result; - Not needed anymore

			//populate for select checkbox
			for (var data of <Material[]>result) {
				data.checked = false;
			}
			this.dataSource.data = result as Material[];

		});

		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	public redirectToDetails = (id: string) => {

	}

	onMaterialSelect(data: Material) {
		if(data.checked == false) {//moving from unchecked to checked
			if(this.materialSelectedFlag != true) {
				this.materialSelectedFlag = true;
			}
			this.initalizeIssueMaterialFormOnSelectChecked(data);
			this.initalizeReturnMaterialFormOnSelectChecked(data);
			this.initalizeRequestMaterialFormOnSelectChecked(data);
		}
		else if (data.checked == true) { //moving from checked to unchecked
			this.resetIssueMaterialFormOnSelectUnChecked(data);
			this.resetReturnMaterialFormOnSelectUnChecked(data);
			this.resetRequestMaterialFormOnSelectUnChecked(data);
		}	
	}

	initalizeIssueMaterialFormOnSelectChecked(data: Material) {
		this.materialIssue.projectId = data.projectId;
		this.materialIssue.userId = data.userId;
		this.materialIssue.id = data.id;
		this.materialIssue.itemPoNumber = data.itemPoNumber;
		this.materialIssue.make = data.make;
		this.materialIssue.model = data.model;
		this.materialIssue.issuedQuantity = '';
		this.materialIssue.availableQuantity = data.totalQuantity;
		this.materialIssue.uomCode = data.uomCode;

		this.materialIssue.issueReason = '';
		this.materialIssue.requester = '';
		this.materialIssue.materialReceiverName = '';
		this.materialIssue.itemCollectedBy = '';
		this.materialIssue.issuerRemark = '';
		this.materialIssue.issueDate = null;

		// this.materialIssueArray.push(this.materialIssue);
		// alert(JSON.stringify(this.materialsSelectedForIssue.value))

		this.materialsSelectedForIssue.push(this.issueMaterialFormBuilder.group(this.materialIssue));
	}

	initalizeReturnMaterialFormOnSelectChecked(data: Material) {
		this.materialReturn.projectId = data.projectId;
		this.materialReturn.userId = data.userId;
		this.materialReturn.id = data.id;
		this.materialReturn.itemPoNumber = data.itemPoNumber;
		this.materialReturn.make = data.make;
		this.materialReturn.model = data.model;
		this.materialReturn.returnQuantity = '';
		this.materialReturn.uomCode = data.uomCode;
		this.materialReturn.returnIssueNumber = '';
		this.materialReturn.returnBy = '';
		this.materialReturn.returnAcceptedBy = '';
		this.materialReturn.returnRemark = '';
		this.materialReturn.returnDate = null;

		this.materialsSelectedForReturn.push(this.returnMaterialFormBuilder.group(this.materialReturn));
	}

	initalizeRequestMaterialFormOnSelectChecked(data: Material) {

		this.materialRequest.projectId = data.projectId;
		this.materialRequest.userId = data.userId;
		this.materialRequest.id = data.id;

		this.materialRequest.requestDescription = '';
		this.materialRequest.uomCode = data.uomCode;
		this.materialRequest.requestQuantity = '';
		this.materialRequest.requestReason = '';
		this.materialRequest.requestDocumentReference = '';
		this.materialRequest.requestAffect = '';
		this.materialRequest.requestDeliverBy = '';
		this.materialRequest.requestOriginator = '';
		this.materialRequest.requestDeliverTo = '';
		this.materialRequest.requestDiscipline = '';
		this.materialRequest.requestType = '';
		this.materialRequest.requestDate = null;

		this.materialsSelectedForRequest.push(this.requestMaterialFormBuilder.group(this.materialRequest));
	}

	resetIssueMaterialFormOnSelectUnChecked(data: Material) {
		for(var arraydata of this.materialsSelectedForIssue.value) {
			var index = 0;
			if(arraydata.itemPoNumber == data.itemPoNumber) {
				break;
			}
			index++;
		}
		this.materialsSelectedForIssue.removeAt(index);//remove unchecked data section from material to issue card

		//if all are unchecked then disable buttons
		for(var material of this.dataSource.data) {
			if((material.itemPoNumber !=  data.itemPoNumber) && material.checked == true ) {
				//atleast one item is select
				return;
			}
		}
		this.materialSelectedFlag = false; // disable button
		this.state = 'NONE'; //hide issue card
	}

	resetReturnMaterialFormOnSelectUnChecked(data: Material) {
		for(var arraydata of this.materialsSelectedForReturn.value) {
			var index = 0;
			if(arraydata.itemPoNumber == data.itemPoNumber) {
				break;
			}
			index++;
		}
		this.materialsSelectedForReturn.removeAt(index);//remove unchecked data section from material to issue card

		//if all are unchecked then disable buttons
		for(var material of this.dataSource.data) {
			if((material.itemPoNumber !=  data.itemPoNumber) && material.checked == true ) {
				//atleast one item is select
				return;
			}
		}
		this.materialSelectedFlag = false; // disable button
		this.state = 'NONE'; //hide issue card

	}

	resetRequestMaterialFormOnSelectUnChecked(data: Material) {
		for(var arraydata of this.materialsSelectedForRequest.value) {
			var index = 0;
			if(arraydata.itemPoNumber == data.itemPoNumber) {
				break;
			}
			index++;
		}
		this.materialsSelectedForRequest.removeAt(index);//remove unchecked data section from material to issue card

		//if all are unchecked then disable buttons
		for(var material of this.dataSource.data) {
			if((material.itemPoNumber !=  data.itemPoNumber) && material.checked == true ) {
				//atleast one item is select
				return;
			}
		}
		this.materialSelectedFlag = false; // disable button
		this.state = 'NONE'; //hide issue card
	}

	isMaterialSelected() {
		return this.materialSelectedFlag;
	}

	isStateIssueMaterial() {
		return this.state == "ISSUE_MATERIAL";
	}

	isStateReturnMaterial() {
		return this.state == "RETURN_MATERIAL";
	}

	isStateRequestMaterial() {
		return this.state == "REQUEST_MATERIAL";
	}

	onClickIssue(eventData: any) {
		this.state = "ISSUE_MATERIAL";

		// this.materialService.issueMaterial(() => {}, () => {});
		//this.router.navigate(['/issuematerial']);

	}

	onClickRequest(eventData: any) {

		this.state = "REQUEST_MATERIAL";

		// this.materialService.requestMaterial(() => {}, () => {});
		//   this.router.navigate(['/requestmaterial']);
	}

	onClickReturn(eventData: any) {

		this.state = "RETURN_MATERIAL";

		// this.materialService.returnMaterial(() => {}, () => {});
		//   this.router.navigate(['/returnmaterial']);

	}

	onSaveMaterialIssue(eventData: any) {

		this.state = "";

		// this.router.navigate(['/materials']);

	}

	onCancelMaterialIssue(eventData: any) {

		this.state = "";
		// this.router.navigate(['/materials']);
	}

	onSaveReturnMaterial(eventData: any) {

		this.state = "";

		// this.router.navigate(['/materials']);

	}

	onCancelReturnMaterial(eventData: any) {

		this.state = "";
		// this.router.navigate(['/materials']);
	}

	onSaveRequestMaterial(eventData: any) {

		this.state = "";

		// this.router.navigate(['/materials']);

	}

	onCancelRequestMaterial(eventData: any) {

		this.state = "";
		// this.router.navigate(['/materials']);
	}
}
