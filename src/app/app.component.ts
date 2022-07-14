import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testFormApp';

  formSettings = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  nameFormErrorText: string = '';
  emailFormErrorText: string = '';
  passwordFormErrorText: string = '';

  constructor(private fb: FormBuilder) { }

  validateName(input: string) {
    if (this.formSettings.controls[input].errors) {
      if (this.formSettings.controls[input].errors!['required']) {
        this.nameFormErrorText = 'El nombre es un campo obligatorio';
      }
    }
    return this.inputError(input);
  }

  validateEmail(input: string) {
    if (this.formSettings.controls[input].errors) {
      if (this.formSettings.controls[input].errors!['required']) {
        this.emailFormErrorText = 'El email es un campo obligatorio';
      }
      else if (this.formSettings.controls[input].errors!['email']) {
        this.emailFormErrorText = 'El email debe tener un formato de correo';
      }
    }
    return this.inputError(input);
  }

  validatePassword(input: string) {
    if (this.formSettings.controls[input].errors) {
      if (this.formSettings.controls[input].errors!['required']) {
        this.passwordFormErrorText = 'La contraseña es un campo obligatorio';
      }
      else if (this.formSettings.controls[input].errors!['minlength']) {
        this.passwordFormErrorText = 'La contraseña debe tener al menos 3 caracteres';
      }
    }
    return this.inputError(input);
  }

  /**
   * Comprueba si un campo del formulario tiene un error
   * @param input Nombre del campo de input a validar
   * @returns Existencia de error
   */
  inputError(input: string) {
    return this.formSettings.controls[input].errors && this.formSettings.controls[input].touched;
  }

  saveForm(): void {
    console.log(this.formSettings.value);
  }

}
