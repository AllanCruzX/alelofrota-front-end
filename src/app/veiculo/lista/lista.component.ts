import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng-lts/api';

import { VeiculoService } from '../services/veiculo.service';
import { Veiculo } from '../models/veiculo';
import { VeiculoFiltro } from './../models/veiculo-filtro';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListaComponent implements OnInit {

  filtro: VeiculoFiltro = new VeiculoFiltro();
  veiculos: Veiculo[] = [];

  cols: any[] = [];
  totalVeiculos: number;
  paginaAtual: number = 1;
  carregar: boolean;
  errorMessage: string;

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'id', header: 'Número' },
      { field: 'placa', header: 'Placa' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'fabricante', header: 'Fabricante' },
      { field: 'status', header: 'Status' }

    ];

    this.carregar = true;

  }

  consultar() {

   // this.filtro.status = 'true';
    this.veiculoService.obterTodos(this.filtro, this.paginaAtual).subscribe(veiculos => {

      this.veiculos = veiculos['content'];

      this.totalVeiculos = veiculos['totalElements'];

      console.log(this.veiculos);

    },
      err => {
        console.log(err);
        this.errorMessage
      });

  }

  carregaVeiculos(event: LazyLoadEvent) {
    this.carregar = true;
    this.paginaAtual = event.first / event.rows;

    this.consultar();

    setTimeout(() => {
      if (this.veiculos) {
        this.carregar = false;
      }
    }, 1000);
  }
}
