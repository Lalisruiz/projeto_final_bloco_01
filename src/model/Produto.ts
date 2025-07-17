export abstract class Produto {
    private _id: number;
    private _nome: string;
    private _preco: number;
    private _descricao: string;
    private _quantidadeEstoque: number;

    constructor(
        id: number, 
        nome: string, 
        preco: number, 
        descricao: string, 
        quantidadeEstoque: number
    ) {
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._descricao = descricao;
        this._quantidadeEstoque = quantidadeEstoque;
    }

    // Getters e Setters
    public get id(): number {
        return this._id;
    }
    
    public set id(id: number) {
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public get preco(): number {
        return this._preco;
    }

    public set preco(preco: number) {
        this._preco = preco;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(descricao: string) {
        this._descricao = descricao;
    }

    public get quantidadeEstoque(): number {
        return this._quantidadeEstoque;
    }

    public set quantidadeEstoque(quantidade: number) {
        this._quantidadeEstoque = quantidade;
    }

    // Método abstrato
    public abstract visualizar(): void;
}