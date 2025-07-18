import readlinesync = require('readline-sync');
import { colors } from './src/util/Colors';

export function main() {
    let opcao: number;

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
        console.log("            3 - Consultar Produto por ID             ");
        console.log("            4 - Atualizar Produto                    ");
        console.log("            5 - Deletar Produto                      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("Entre com a opção desejada:                          ", colors.reset);

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

                const nome = readlinesync.question("Nome: ");
                const preco = readlinesync.questionFloat("Preço: ");
                const descricao = readlinesync.question("Descrição: ");
                const quantidade = readlinesync.questionInt("Quantidade em Estoque: ");

                const novoProduto = new ModaFitness(0, nome, preco, descricao, quantidade, "M"); 
                controller.cadastrar(novoProduto);

                keyPress();
                break;

            case 2:
                console.log(colors.fg.white, "\n\nListar Produtos\n\n", colors.reset);
                controller.listarTodos();
                keyPress();
                break;

            case 3:
                console.log(colors.fg.white, "\n\nConsultar Produto por ID\n\n", colors.reset);
                const idConsulta = readlinesync.questionInt("ID do Produto: ");
                controller.consultarPorId(idConsulta);
                keyPress();
                break;

            case 4:
                console.log(colors.fg.white, "\n\nAtualizar Produto\n\n", colors.reset);
                const idAtualiza = readlinesync.questionInt("ID do Produto a atualizar: ");
                const nomeAtualiza = readlinesync.question("Novo nome: ");
                const precoAtualiza = readlinesync.questionFloat("Novo preço: ");
                const descAtualiza = readlinesync.question("Nova descrição: ");
                const quantAtualiza = readlinesync.questionInt("Nova quantidade: ");

                const produtoAtualizado = new ModaFitness(idAtualiza, nomeAtualiza, precoAtualiza, descAtualiza, quantAtualiza, "M");
                controller.atualizar(produtoAtualizado);
                keyPress();
                break;

            case 5:
                console.log(colors.fg.white, "\n\nDeletar Produto\n\n", colors.reset);
                const idDeleta = readlinesync.questionInt("ID do Produto a deletar: ");
                controller.deletar(idDeleta);
                keyPress();
                break;

            default:
                console.log(colors.fg.red, "\nOpção Inválida!\n", colors.reset);
                keyPress();
        }
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
