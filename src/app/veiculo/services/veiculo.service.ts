import { VeiculoFiltro } from './../models/veiculo-filtro';
import { Modelo } from './../models/modelo';
import { Fabricante } from './../models/fabricante';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Veiculo } from "../models/veiculo";
import { VeiculoInput } from '../models/veiculoInput';


@Injectable()
export class VeiculoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(filtro: VeiculoFiltro, page: number): Observable<Veiculo[]> {


      const params = new HttpParams()
        .append('page', page.toString())
        .append('veiculoId' , filtro.veiculoId == null ? '' : filtro.veiculoId)
        .append('placa' , filtro.placa == null ? '' : filtro.placa)
        .append('status' , filtro.status == null ? 'true' : filtro.status);

        return this.http
            .get<Veiculo[]>(this.UrlServiceV1 + "veiculos",{ params })
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: number): Observable<Veiculo> {
        return this.http
            .get<Veiculo>(this.UrlServiceV1 + "veiculos/" + id)
            .pipe(catchError(super.serviceError));
    }

    novoVeiculo(veiculo: VeiculoInput): Observable<Veiculo> {
        return this.http
            .post(this.UrlServiceV1 + "veiculos", veiculo)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarVeiculo(veiculo: VeiculoInput , id:number): Observable<Veiculo> {
        return this.http
            .put(this.UrlServiceV1 + "veiculos/" + id, veiculo)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirVeiculo(id: number): Observable<Veiculo> {
        return this.http
            .delete(this.UrlServiceV1 + "veiculos/" + id)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterFabricantes(): Observable<Fabricante[]> {
        return this.http
            .get<Fabricante[]>(this.UrlServiceV1 + "fabricantes")
            .pipe(catchError(super.serviceError));
    }


    obterModelos(id: number): Observable<Modelo[]> {
      return this.http
          .get<Modelo[]>(this.UrlServiceV1 + "fabricantes/modelos/" + id)
          .pipe(catchError(super.serviceError));
  }

}
