import { useState, useEffect } from "react"; 
// Importa os hooks useState e useEffect do React para gerenciar estado e efeitos colaterais.

import './ListaTarefas.css';
// Importa o arquivo CSS para estilizar o componente.

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]); 
    // Estado que armazena a lista de tarefas. Inicialmente, é um array vazio.

    const [novaTarefa, setNovaTarefa] = useState(""); 
    // Estado que armazena o texto da nova tarefa a ser adicionada. Inicialmente, é uma string vazia.

    const [ordenacao, setOrdenacao] = useState("data"); 
    // Estado que controla o critério de ordenação das tarefas. Inicialmente, é "data".
    
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== "") {
            // Verifica se o texto da nova tarefa não está vazio.

            setTarefas([
                ...tarefas,
                { texto: novaTarefa, concluida: false, data: new Date() },
                // Adiciona uma nova tarefa ao estado 'tarefas' com o texto, status de concluída (false) e a data atual.
            ]);
            setNovaTarefa("");
            // Limpa o campo de entrada da nova tarefa.
        }
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
        // Remove a tarefa correspondente ao índice fornecido.
    };

    const alternarConcluida = (indice) => {
        setTarefas(
            tarefas.map((tarefa, i) =>
                i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
                // Alterna o status de 'concluida' da tarefa correspondente ao índice fornecido.
            )
        );
    };

    const ordenarTarefas = (criterio) => {
        const tarefasOrdenadas = [...tarefas];
        // Cria uma cópia da lista de tarefas para evitar mutações diretas.

        if (criterio === "alfabetica") {
            tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
            // Ordena as tarefas em ordem alfabética com base no texto.
        } else if (criterio === "data") {
            tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data));
            // Ordena as tarefas por data de adição.
        }

        setTarefas(tarefasOrdenadas);
        // Atualiza o estado 'tarefas' com a lista ordenada.

        setOrdenacao(criterio);
        // Atualiza o estado 'ordenacao' com o critério selecionado.
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            {/* Título do componente */}

            <input
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder="Digite uma nova tarefa"
                // Campo de entrada para digitar uma nova tarefa. Atualiza o estado 'novaTarefa' ao digitar.
            />

            <button onClick={adicionarTarefa}>Adicionar</button>
            {/* Botão para adicionar uma nova tarefa à lista */}

            <div>
                <button onClick={() => ordenarTarefas("alfabetica")}>
                    Ordenar por ordem alfabética
                </button>
                {/* Botão para ordenar as tarefas em ordem alfabética */}

                <button onClick={() => ordenarTarefas("data")}>
                    Ordenar por data de adição
                </button>
                {/* Botão para ordenar as tarefas por data */}
            </div>

            <ul>
                {tarefas.map((tarefa, indice) => (
                    <li
                        key={indice}
                        style={{
                            textDecoration: tarefa.concluida ? "line-through" : "none",
                            color: tarefa.concluida ? "#4CAF50" : "#333",
                            // Aplica estilos diferentes dependendo do status de 'concluida'.
                        }}
                    >
                        {tarefa.texto}
                        {/* Exibe o texto da tarefa */}

                        <button onClick={() => alternarConcluida(indice)}>
                            {tarefa.concluida ? "Desmarcar" : "Concluir"}
                        </button>
                        {/* Botão para alternar o status de concluída da tarefa */}

                        <button onClick={() => removerTarefa(indice)}>Remover</button>
                        {/* Botão para remover a tarefa */}
                    </li>
                ))}
            </ul>
            {/* Lista de tarefas renderizada dinamicamente */}
        </div>
    );
}

export default ListaTarefas;
// Exporta o componente para ser utilizado em outros arquivos.