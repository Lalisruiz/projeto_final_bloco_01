import { Produto } from "./Produto";

export class ModaFitness extends Produto {
    private _tamanho: string;
    private _cor: string;
    private _categoria: string;
    private _material: string;

    constructor(
        id: number,
        nome: string,
        preco: number,
        descricao: string,
        quantidadeEstoque: number,
        tamanho: string,
        cor: string,
        categoria: string,
        material: string
    ) {
        super(id, nome, preco, descricao, quantidadeEstoque);
        this._tamanho = tamanho;
        this._cor = cor;
        this._categoria = categoria;
        this._material = material;
    }

    // Getters e Setters
    public get tamanho(): string {
        return this._tamanho;
    }

    public set tamanho(tamanho: string) {
        this._tamanho = tamanho;
    }

    public get cor(): string {
        return this._cor;
    }

    public set cor(cor: string) {
        this._cor = cor;
    }

    public get categoria(): string {
        return this._categoria;
    }

    public set categoria(categoria: string) {
        this._categoria = categoria;
    }

    public get material(): string {
        return this._material;
    }

    public set material(material: string) {
        this._material = material;
    }

    // Implementação do método abstrato
    public visualizar(): void {
        console.log(`
        Detalhes do Produto:
        ------------------------------
        ID: ${this.id}
        Nome: ${this.nome}
        Preço: R$ ${this.preco.toFixed(2)}
        Descrição: ${this.descricao}
        Estoque: ${this.quantidadeEstoque}
        Tamanho: ${this.tamanho}
        Cor: ${this.cor}
        Categoria: ${this.categoria}
        Material: ${this.material}
        ------------------------------
        `);
    }
}