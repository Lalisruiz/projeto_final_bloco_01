import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoController implements ProdutoRepository {
    // Uso de Map como Collection 
    private listaProdutos: Map<number, Produto> = new Map();
    private ultimoId: number = 0;

    // Método privado com tratamento de exception
    private validarProduto(produto: Produto): void {
        if (!produto.nome || produto.nome.trim() === "") {
            throw new Error("Nome do produto é obrigatório!");
        }
        if (produto.preco <= 0) {
            throw new Error("Preço deve ser maior que zero!");
        }
    }

    // Implementações CRUD com tratamento de exceptions
    public listarTodos(): void {
        if (this.listaProdutos.size === 0) {
            console.log("\nNão há produtos cadastrados.");
            return;
        }
        this.listaProdutos.forEach(produto => produto.visualizar());
    }

    public buscarPorId(id: number): Produto | null {
        const produto = this.listaProdutos.get(id);
        if (!produto) {
            throw new Error(`Produto com ID ${id} não encontrado!`);
        }
        return produto;
    }

    public cadastrar(produto: Produto): boolean {
        try {
            this.validarProduto(produto);
            produto.id = ++this.ultimoId;
            this.listaProdutos.set(produto.id, produto);
            console.log(`\nProduto "${produto.nome}" cadastrado com sucesso!`);
            return true;
        } catch (error) {
            console.error((error as Error).message);
            return false;
        }
    }

    public atualizar(produto: Produto): boolean {
        try {
            if (!this.listaProdutos.has(produto.id)) {
                throw new Error("Produto não encontrado para atualização!");
            }
            this.validarProduto(produto);
            this.listaProdutos.set(produto.id, produto);
            console.log(`\nProduto ID ${produto.id} atualizado!`);
            return true;
        } catch (error) {
            console.error((error as Error).message);
            return false;
        }
    }

    public deletar(id: number): boolean {
        try {
            if (!this.listaProdutos.delete(id)) {
                throw new Error("Produto não encontrado para exclusão!");
            }
            console.log(`\nProduto ID ${id} removido!`);
            return true;
        } catch (error) {
            console.error((error as Error).message);
            return false;
        }
    }
}