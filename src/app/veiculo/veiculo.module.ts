import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {TableModule} from 'primeng-lts/table';
import {ButtonModule} from 'primeng-lts/button';
import {TooltipModule} from 'primeng-lts/tooltip';


import { VeiculoRoutingModule } from './veiculo.route';
import { VeiculoAppComponent } from './veiculo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VeiculoService } from './services/veiculo.service';
import { VeiculoResolve } from './services/veiculo.resolve';
import { VeiculoGuard } from './services/veiculo.guard';

@NgModule({
  declarations: [
    VeiculoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent

  ],
  imports: [
    CommonModule,
    VeiculoRoutingModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    VeiculoService,
    VeiculoResolve,
    VeiculoGuard
  ]
})
export class VeiculoModule { }
