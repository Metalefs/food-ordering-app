import { Component, OnInit, Input } from '@angular/core';
import { Collections } from '../../../shared/_models/MongoCollections';
import { fade } from '../../../animations';
import { PrecoMarmitexService } from '../../../api/services/PrecoMarmitexService';
import { InformacoesContatoService } from '../../../api/services/InformacoesContatoService';
@Component({
  selector: 'app-exibicao-pedido',
  templateUrl: './exibicao-pedido.component.html',
  styleUrls: ['./exibicao-pedido.component.css'],
  animations: [fade]
})
export class ExibicaoPedidoComponent implements OnInit {
  @Input()
  Pedido:Collections.Pedido;
  InformacoesContato:Collections.InformacoesContato;
  PrecoMarmitex:Collections.PrecoMarmitex[];

  constructor(private InformacoesContatoService: InformacoesContatoService,
    PrecoMarmitexService: PrecoMarmitexService) {
      PrecoMarmitexService.Ler().subscribe(x=>this.PrecoMarmitex = x);
      InformacoesContatoService.Ler().subscribe(x=> this.InformacoesContato = x[0]);
  }


  CriarMensagemPedido(){
    let mensagem = "Pedido undefined, " +
      this.Pedido.MensagemCardapio() + 
      ". Complementos: " + this.Pedido.MensagemComplemento() + 
      " Endereço: undefined - Lagoa Santa, Minas Gerais";
    
    alert(mensagem)
  }


  ngOnInit(): void {
  }

}