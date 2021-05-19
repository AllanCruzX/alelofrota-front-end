import { VeiculoResolve } from './services/veiculo.resolve';
import { VeiculoGuard } from './services/veiculo.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VeiculoAppComponent } from './veiculo.app.component';


const veiculoRouterConfig: Routes = [
    {
        path: '', component: VeiculoAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VeiculoGuard],
                canActivate: [VeiculoGuard],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VeiculoGuard],
                resolve: {
                    veiculo: VeiculoResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VeiculoGuard],
                resolve: {
                  veiculo: VeiculoResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(veiculoRouterConfig)
    ],
    exports: [RouterModule]
})
export class VeiculoRoutingModule { }
