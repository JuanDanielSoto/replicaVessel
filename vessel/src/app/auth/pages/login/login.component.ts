import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: UntypedFormGroup = this.fb.group({
    email:    ['halogeno321@gmail.com', [ Validators.required, Validators.email ]],
    password: ['n313232590', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: UntypedFormBuilder,
               private router: Router,
               private authService: AuthService) { }


  login() {

    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password )
      .subscribe( ok => {

        if ( ok === true ) {
          this.router.navigateByUrl('/listado');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

}
