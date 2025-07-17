import { ProdutoController } from "../controller/ProdutoController";
import { ModaFitness } from "../model/ModaFitness";

// 1. Configuração inicial
const controller = new ProdutoController();

// 2. Dados de teste
const produtoTeste = new ModaFitness(
    0, // ID será gerado
    "Legging Fitness",
    129.90,
    "Legging de compressão",
    10,
    "M",
    "Preto",
    "Legging",
    "Poliéster"
);

// 3. Testes CRUD
console.log("=== INÍCIO DOS TESTES ===");

// Teste 1: Cadastro
console.log("\n[TESTE 1] Cadastrar produto:");
controller.cadastrar(produtoTeste);

// Teste 2: Listar todos
console.log("\n[TESTE 2] Listar produtos:");
controller.listarTodos();

// Teste 3: Buscar por ID
console.log("\n[TESTE 3] Buscar produto por ID:");
controller.buscarPorId(1); // ID gerado automaticamente

// Teste 4: Atualizar
console.log("\n[TESTE 4] Atualizar produto:");
const produtoAtualizado = new ModaFitness(
    1, // Mesmo ID do cadastrado
    "Legging Fitness Premium",
    149.90,
    "Material melhorado",
    15,
    "G",
    "Azul",
    "Legging",
    "Dry Fit"
);
controller.atualizar(produtoAtualizado);
controller.listarTodos();

// Teste 5: Deletar
console.log("\n[TESTE 5] Deletar produto:");
controller.deletar(1);
controller.listarTodos(); // Deve mostrar lista vazia

console.log("\n=== FIM DOS TESTES ===");