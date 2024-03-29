import { Component, OnInit, ViewChild } from '@angular/core';
import { Collections } from 'src/app/data/schema/MongoCollections';
import { PedidoService } from 'src/app/data/service/domain/PedidoService';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DetalhesPedidoDialogComponent } from './detalhes-pedido/detalhes-pedido-dialog/detalhes-pedido-dialog.component';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css'],
  animations: [fade]
})
export class MeusPedidosComponent implements OnInit {

  Pedidos: any;
  NAPedido: boolean;
  @ViewChild(MatTable) MatTable: MatTable<any>;
  constructor(private PedidoService: PedidoService,
    public dialog: MatDialog) {
    
  }
  displayedColumns: string[] = ['Nome', 'Preço', 'Tamanho', 'Data','Detalhes'];
  
  openDialog(pedido): void {
    console.log(pedido);
    const dialogRef = this.dialog.open(DetalhesPedidoDialogComponent, {
      width: '90%',
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  LerPedidos(){
    this.PedidoService.Ler().subscribe(x=> {
      this.Pedidos = x;
      if(this.Pedidos.length == 0 || this.Pedidos.erro)
        this.NAPedido = true
      } );
  }

  ConfirmarRecebimento(pedido){
    this.PedidoService.ConfirmarRecebimento(pedido).subscribe(x=>{
      this.LerPedidos();
    });
  }

  Cancelar(pedido){
    this.PedidoService.Cancelar(pedido).subscribe(x=>{
      this.LerPedidos();
    });
  }

  ngOnInit(): void {
    this.LerPedidos();
  }

}
