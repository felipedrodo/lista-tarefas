// Importações
import { useState, useEffect } from "react";
import "./ListaTarefas.css";

function ListaTarefas() {
    // Estado para armazenar as tarefas, onde ele acessa o localStorage e mostras as tarefas salvas, e se não tiver deixa o estado vazio
    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
    });

    const [novaTarefa, setNovaTarefa] = useState(''); // Estado para a nova tarefa digitada
    const [novaData, setNovaData] = useState(''); // Estado para a nova data de entrega digitada
    const [ordenacao, setOrdenacao] = useState('data'); // Estado para definir o tipo de ordenação

    // Efeito que salva as tarefas no localStorage sempre que a lista for atualizada, fazendo com que elas fiquem salvas
    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    // Função para adicionar uma nova tarefa, a data de entrega e a data que está sendo digitada, além de deixar o valor vazios após adicionar as tarefas
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([
                ...tarefas,
                {
                    texto: novaTarefa,
                    dataDeEntrega: novaData,
                    data: new Date().toISOString()
                }
            ]);
            setNovaTarefa('');
            setNovaData('');
        }
    };

    // Função para remover uma tarefa pelo índice
    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
    };

    // Cria uma cópia das tarefas e ordena conforme o estado 'ordenacao'que é por ordem alfabética ou pela data que foi inserida
    const tarefasOrdenadas = [...tarefas];
    if (ordenacao === 'alfabetica') {
        tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
    } else if (ordenacao === 'data') {
        tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data));
    }

    return (
        <div>
            <h2 className="subtitulo">Lista de Tarefas</h2>

            <div className="formulario">
                <input
                    className="entrada"
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    placeholder="Digite uma nova tarefa"
                />
                <input
                    className="entrada"
                    type="text"
                    value={novaData}
                    onChange={(e) => setNovaData(e.target.value)}
                    placeholder="Digite a data de entrega:"
                />
                <button className="botaoAdd" onClick={adicionarTarefa}>Adicionar</button>
            </div>

            <div className="ordenacao">
                <label htmlFor="ordenacao">Ordenar por :</label>
                <select
                    id="ordenacao"
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                >
                    <option value="data">Data de Adição</option>
                    <option value="alfabetica">Ordem Alfabética</option>
                </select>
            </div>

            <ul className="lista">
                {tarefasOrdenadas.map((tarefa, indice) => {
                    return (
                    <li key={indice} className="item">
                        <span>{tarefa.texto}</span>
                        <span>{tarefa.dataDeEntrega}</span>
                        <div className="botoes">
                            <button className="botaoRem" onClick={() => removerTarefa(indice)}>
                                Remover
                            </button>
                        </div>
                    </li>
                )})}
            </ul>
        </div>
    );
}

export default ListaTarefas;





