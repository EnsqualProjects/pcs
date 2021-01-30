import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {PhoneType} from '../_models';
import {CustomValidator} from '../_helpers';
import { AlertService, UserService } from '../_services';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    phoneTypes : PhoneType[] = [
        {name: 'Home', code: '01'},
        {name: 'Office', code: '02'},
        {name: 'Mobile', code: '03'},
        {name: 'Other', code: '04'},
      ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            organizationName: ['', Validators.required],
            designation: [''],
            address1: ['', Validators.required],
            address2: [''],
            city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            zipCode: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('[0-9 ]*'), Validators.minLength(10), Validators.maxLength(10)]],
            phoneExtension: [''],
            phoneType: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        }, {validator:CustomValidator.matchPassword});
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration Pending Code Verification', true);
                    this.router.navigate(['/verifyAuthCode']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
