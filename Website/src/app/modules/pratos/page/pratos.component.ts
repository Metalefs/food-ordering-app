import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/data/schema/MongoCollections';
import { CardapioService } from 'src/app/data/service/domain/CardapioService';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from 'src/app/shared/component/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from 'src/app/shared/component/dynamic-form/question-textbox';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Table } from 'src/app/data/schema/Table';
import { CardapioHelper } from 'src/app/_helpers/cardapio_helper';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.css'],
  animations: [fade]
})
export class PratosComponent implements OnInit {
  x : any;
  loading = true;
  CardapioTable:Table;
  constructor(private api: CardapioService,
    private CardapioHelper: CardapioHelper) { 
    this.CardapioTable = new Table();
    this.api = api;
    this.AtualizarTabela();
    this.CardapioTable.displayedColumns = [
      "Dia",
      "Nome",
      "Ingredientes",
    ];

  }
  AtualizarTabela(){
    this.api.Ler().subscribe(x=>{
      x.sort(function(a, b){return parseInt(a.Dia)-parseInt(b.Dia)})
      x.forEach(y => {
        y.Dia = this.CardapioHelper.ObterDiaSemana(y.Dia);
      });
      this.CardapioTable.dataSource = x;
      this.loading = false;
    })
  }

  ngOnInit(): void {
    // this.x = setInterval(() => { 
    //    this.AtualizarTabela();
    //   },
    // 1100);
  }

}
