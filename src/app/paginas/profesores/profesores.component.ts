import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../servicio/profesores.service';
import { Profesores } from '../../models/profesores.model';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  registerForm = new FormGroup({
    mote: new FormControl('', Validators.compose([Validators.required,Validators.pattern('/^[a-z0-9_]+$/')])),
    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required),
    passwordRepe: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    centro: new FormControl('', Validators.required),
  });

  constructor(
    private profesores: ProfesorService
  ) { }

  ngOnInit(): void {
    this.profesores.getProfesores().subscribe(
      (value: Profesores[]) => {
        console.log(value);
      }
    )
  }
  addProfesor(): void {
    let mote = this.registerForm.controls.mote.value!;
    let correo = this.registerForm.controls.correo.value!;
    let password = this.registerForm.controls.password.value!;
    let nombre = this.registerForm.controls.nombre.value!;
    let apellidos = this.registerForm.controls.apellidos.value!;
    let centro = this.registerForm.controls.centro.value!;

    const profesor: Profesores = {
      mote: mote,
      correo: correo,
      password: password,
      nombre: nombre,
      apellidos: apellidos,
      centro: centro
    };
    this.profesores.addProfesores(profesor).subscribe({

      next: (value: Profesores) => {
        console.log(value)
      }
    });

    this.registerForm.reset();
  }
}
