import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  formulario = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3),Validators.maxLength(150)]),
    idade: new FormControl(null,[Validators.required, Validators.max(120), Validators.min(18)]),
    cidade: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(200)])
  })  

  ocultarBotoes:boolean = true;
  indice:number = -1;
  vetorPessoas:Pessoa[] = [];

  // Cadastrar
  cadastrarPessoa(){
    this.vetorPessoas.push(this.formulario.value as Pessoa);    // Insere os dados dos inputs no vetor
    this.formulario.reset();                                    // Limpa os inputs ao cadastrar uma Pessoa
  }

  // Selecionar
  selecionarPessoa(indice:number){
    this.indice = indice;

    this.formulario.setValue({
      nome: this.vetorPessoas[indice].nome,
      idade: this.vetorPessoas[indice].idade,
      cidade: this.vetorPessoas[indice].cidade
    })

    this.ocultarBotoes = false;
  }

  // Alterar
  alterarPessoa(indice:number){
    this.vetorPessoas[this.indice] = this.formulario.value as Pessoa; // Altera a pessoa selecionada
    this.ocultarBotoes = true;
    this.formulario.reset();
  }

  // Remover
  removerPessoa(indice:number){
    this.vetorPessoas.splice(indice,1); // Remove elementos do array, nesse caso irá remover só 1 pessoa
    this.ocultarBotoes = true;
    this.formulario.reset();
  }

  // Cancelar
  cancelarSelecao(){
    this.ocultarBotoes = true;
    this.formulario.reset();
  }
}
