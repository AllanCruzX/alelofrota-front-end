import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-components/form-base.component';
import { Modelo } from './models/modelo';
import { Fabricante } from './models/fabricante';
import { VeiculoInput } from './models/veiculoInput';

export abstract class VeiculoBaseComponent extends FormBaseComponent {

    veiculo: VeiculoInput = new VeiculoInput();
    fabricantes: Fabricante[] = [];
    modelos: Modelo[] = [];
    errors: any[] = [];
    veiculoForm: FormGroup;
    listStatus: any[];

    constructor() {
        super();

        this.validationMessages = {
          fabricante: {
            required: 'Escolha um Fabricante',
            },
            modelo: {
                required: 'Escolha um Modelo',
            },
            placa: {
                required: 'Informe a Placa',
                minlength: 'Mínimo de 10 caracteres',
                maxlength: 'Máximo de 15 caracteres'
            },
            status: {
                required: 'Informe o Status',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.veiculoForm);
    }

    getListStaus(){
      return[
        {valor: true , desc: 'Ativo'},
        {valor: false , desc: 'Inativo'}
      ];
    }

    setVeiculo(){
      this.veiculo.placa = this.veiculoForm.controls['placa'].value;
      this.veiculo.modelo = this.veiculoForm.controls['modelo'].value;
      this.veiculo.status = this.veiculoForm.controls['status'].value;
    }


}
