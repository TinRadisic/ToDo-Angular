import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from './interface/login.interface';
import { LoginService } from './services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(public loginService: LoginService) {}
  data: Partial<ILogin> = {};
  loginForm = new FormGroup({
    username: new FormControl('', Validators.minLength(2)),
    password: new FormControl('', Validators.minLength(2)),
  });

  getData(): void {
    this.data.username = this.loginForm.get('username')?.value ?? '';
    this.data.password = this.loginForm.get('password')?.value ?? '';

    console.log(this.data);
    //Neki poziv na backend odradi svoje
    this.loginForm.reset();

    this.loginService.getData().subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error.message);
      },
    );
  }
}
