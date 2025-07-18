import readlinesync from 'readline-sync';
import { colors } from './src/util/Colors';
import { ProdutoController } from './src/controller/ProdutoController';
import { ModaFitness } from './src/model/ModaFitness';

export function main() {
    let opcao: number;
    const produtoController = new ProdutoController();

    while (true) {
        console.log(colors.bg.black, colors.fg.magenta, 
        "*****************************************************");
        console.log("                                                     ");
        console.log("               MODA FITNESS FEMININA                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Cadastrar Produto                    ");
        console.log("            2 - Listar todos os Produtos             ");
        console.log("            3 - Consultar Produto por ID            ");
        console.log("            4 - Atualizar Produto                   ");
        console.log("            5 - Deletar Produto                     ");
        console.log("            9 - Sair                               ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("Entre com a opção desejada:                         ", colors.reset);

        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log(colors.fg.green, "\nModa Fitness Feminina - O estilo que move você!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.white, "\n\nCadastrar Produto\n\n", colors.reset);
                cadastrarProduto(produtoController);
                keyPress();
                break;
                
            case 2:
                console.log(colors.fg.white, "\n\nListar Produtos\n\n", colors.reset);
                produtoController.listarTodos();
                keyPress();
                break;
                
            case 3:
                console.log(colors.fg.white, "\n\nConsultar Produto\n\n", colors.reset);
                consultarProdutoPorId(produtoController);
                keyPress();
                break;
                
            case 4:
                console.log(colors.fg.white, "\n\nAtualizar Produto\n\n", colors.reset);
                atualizarProduto(produtoController);
                keyPress();
                break;
                
            case 5:
                console.log(colors.fg.white, "\n\nDeletar Produto\n\n", colors.reset);
                deletarProduto(produtoController);
                keyPress();
                break;

            default:
                console.log(colors.fg.red, "\nOpção Inválida!\n", colors.reset);
                keyPress();
        }
    }
}

function cadastrarProduto(controller: ProdutoController): void {
    console.log(colors.fg.cyan, "Cadastrar Novo Produto de Moda Fitness:\n", colors.reset);
    
    const nome = readlinesync.question("Nome do Produto: ");
    const preco = parseFloat(readlinesync.question("Preço (R$): "));
    const descricao = readlinesync.question("Descrição: ");
    const quantidade = parseInt(readlinesync.question("Quantidade em estoque: "));
    
    console.log("\nEspecificações de Moda Fitness:");
    const tamanho = readlinesync.question("Tamanho (P/M/G/GG): ");
    const cor = readlinesync.question("Cor: ");
    const categoria = readlinesync.question("Categoria (Legging/Top/Shorts/Etc): ");
    const material = readlinesync.question("Material: ");

    const novoProduto = new ModaFitness(
        0, // ID será gerado automaticamente
        nome,
        preco,
        descricao,
        quantidade,
        tamanho,
        cor,
        categoria,
        material
    );

    if (controller.cadastrar(novoProduto)) {
        console.log(colors.fg.green, "\nProduto cadastrado com sucesso!", colors.reset);
    }
}

function consultarProdutoPorId(controller: ProdutoController): void {
    const id = parseInt(readlinesync.question("Digite o ID do produto: "));
    
    try {
        const produto = controller.buscarPorId(id);
        if (produto) {
            console.log(colors.fg.yellow, "\nProduto encontrado:", colors.reset);
            produto.visualizar();
        }
    } catch (error) {
        console.log(colors.fg.red, `\nErro: ${(error as Error).message}`, colors.reset);
    }
}

function atualizarProduto(controller: ProdutoController): void {
    const id = parseInt(readlinesync.question("Digite o ID do produto a ser atualizado: "));
    
    try {
        const produtoExistente = controller.buscarPorId(id);
        if (!produtoExistente) return;

        console.log(colors.fg.yellow, "\nDados atuais do produto:", colors.reset);
        produtoExistente.visualizar();
        
        console.log(colors.fg.cyan, "\nDigite os novos dados (deixe em branco para manter o valor atual):", colors.reset);

        const nome = readlinesync.question(`Nome [${produtoExistente.nome}]: `) || produtoExistente.nome;
        const preco = parseFloat(readlinesync.question(`Preço [${produtoExistente.preco.toFixed(2)}]: `) || produtoExistente.preco.toString());
        const descricao = readlinesync.question(`Descrição [${produtoExistente.descricao}]: `) || produtoExistente.descricao;
        const quantidade = parseInt(readlinesync.question(`Quantidade [${produtoExistente.quantidadeEstoque}]: `) || produtoExistente.quantidadeEstoque.toString());
        
        // Campos específicos de ModaFitness
        const tamanho = readlinesync.question(`Tamanho [${(produtoExistente as ModaFitness).tamanho}]: `) || (produtoExistente as ModaFitness).tamanho;
        const cor = readlinesync.question(`Cor [${(produtoExistente as ModaFitness).cor}]: `) || (produtoExistente as ModaFitness).cor;
        const categoria = readlinesync.question(`Categoria [${(produtoExistente as ModaFitness).categoria}]: `) || (produtoExistente as ModaFitness).categoria;
        const material = readlinesync.question(`Material [${(produtoExistente as ModaFitness).material}]: `) || (produtoExistente as ModaFitness).material;

        const produtoAtualizado = new ModaFitness(
            id,
            nome,
            preco,
            descricao,
            quantidade,
            tamanho,
            cor,
            categoria,
            material
        );

        if (controller.atualizar(produtoAtualizado)) {
            console.log(colors.fg.green, "\nProduto atualizado com sucesso!", colors.reset);
        }
    } catch (error) {
        console.log(colors.fg.red, `\nErro: ${(error as Error).message}`, colors.reset);
    }
}

function deletarProduto(controller: ProdutoController): void {
    const id = parseInt(readlinesync.question("Digite o ID do produto a ser removido: "));
    
    try {
        if (controller.deletar(id)) {
            console.log(colors.fg.green, "\nProduto removido com sucesso!", colors.reset);
        }
    } catch (error) {
        console.log(colors.fg.red, `\nErro: ${(error as Error).message}`, colors.reset);
    }
}

function sobre(): void {
    console.log('\n*****************************************************');
    console.log('Projeto desenvolvido por: Larissa Ruiz');
    console.log('Generation Brasil - Turma JavaScript08');
    console.log('https://github.com/Lalisruiz');
    console.log('*****************************************************');
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();