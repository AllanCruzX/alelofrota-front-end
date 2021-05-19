import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Veiculo } from '../models/veiculo';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  veiculo: Veiculo = new Veiculo();

  constructor(private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.veiculo = this.route.snapshot.data['veiculo'];
  }

  public excluirVeiculo() {
    this.veiculoService.excluirVeiculo(this.veiculo.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      (falha)     => { this.falha(falha) }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Veículo excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/veiculos/listar-todos']);
      });
    }
  }

  public falha(evento: any) {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

