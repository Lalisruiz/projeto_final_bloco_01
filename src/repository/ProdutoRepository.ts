import { Produto } from "../model/Produto";

export interface ProdutoRepository {
    listarTodos(): void;
    buscarPorId(id: number): void;
    cadastrar(produto: Produto): void;
    atualizar(produto: Produto): void;
    deletar(id: number): void;
}