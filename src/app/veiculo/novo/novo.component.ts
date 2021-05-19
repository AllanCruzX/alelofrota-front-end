import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { VeiculoService } from '../services/veiculo.service';
import { VeiculoBaseComponent } from '../veiculo-form.base.component';
@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VeiculoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  constructor(private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {


    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      modelo: [null, [Validators.required]],
      fabricante: [null, [Validators.required]],
      status: [true ]
    });

    this.listarFabricantes();

    this.veiculoForm.get('modelo').disable();

    this.veiculoForm.get('fabricante').valueChanges
      .pipe(
        tap(fabricante => console.log('Novo fabricante: ', fabricante)),
        switchMap(async (fabricante) => this.buscarModelos(fabricante != null ? fabricante : null)),
        tap(console.log)
      )
      .subscribe();

      this.listStatus = this.getListStaus();
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarVeiculo() {
    if (this.veiculoForm.dirty && this.veiculoForm.valid) {

      this.setVeiculo();

       this.veiculoService.novoVeiculo(this.veiculo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.veiculoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Veículo cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/veiculos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    var lista: [] = []
    lista = fail.error.objects;

    if (lista != null && lista.length >= 1) {
      this.errors = lista;
      console.log(lista);

    } else if (fail.error.userMessage != null) {
      console.log(fail.error.userMessage);
      this.errors.push(fail.error)
    }
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }



  listarFabricantes() {

    this.veiculoService.obterFabricantes()
      .subscribe(fabricantes => {

        this.fabricantes = fabricantes;
        console.log( this.fabricantes );

      },

        erro => {
          console.log(erro);
          this.processarFalha(erro)

        });


  }

  buscarModelos(id: number) {

    if (id != null) {
       this.veiculoForm.get('modelo').enable();

      this.veiculoService.obterModelos(id)
        .subscribe(modelos => {
          this.modelos = modelos;
          console.log( this.modelos );


        },
          erro => {
            console.log(erro);
            this.processarFalha(erro)
          });
    }
  }



}
