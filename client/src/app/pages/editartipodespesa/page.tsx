"use client"
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { api } from "@/lib/api";
import useToken from '@/components/hooks/useToken';
import { ImBlocked } from "react-icons/im";
import { DeleteIcon } from "@/components/iconesCompartilhados/DeleteIcon";
import { GrEdit } from "react-icons/gr";
import ModalDeleteConfiguracoes from '@/components/ModalDeleteConfiguracoes';
import { Alert } from "@mui/material";
export default function EditarInstituicao() {
    const { tokenUsuario } = useToken()
    const [banco, setBanco] = useState([])
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState<String>()
    const [messageTipo, setMessageTipo] = useState("")
    const [message, setMessage] = useState("")


    const buscaBanco = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get(`/buscatipodespesa`, {
                params: {
                    id: tokenUsuario?.id
                }
            });
            setBanco(response.data)

        }
        catch (error) {
        }
    }

    useEffect(() => {
        buscaBanco()
    }, [])

    const opemModalDelete = (id: any) => {

        setId(id)
        setModalDelete(true)
    }

    const deletaBanco = async (id: any) => {
        if (!tokenUsuario) return;
        try {
            const response = await api.delete('/deletatipodespesa', {
                data: {
                    id: tokenUsuario?.id,
                    idBanco: id
                }
            });

            buscaBanco();
            if (response.status === 200) {
                setMessageTipo("success");
                setMessage(response.data.message);
                setTimeout(() => {
                    setModalDelete(false);
                    setId(" ");
                }, 2000);
            } else {
                setMessage(response.data.message);
                setMessageTipo("error");
            }
        } catch (error: any) {
            // Acessando a mensagem de erro e definindo as mensagens de erro corretamente
            if (error.response) {
                // Erro vindo da resposta da API (por exemplo, erros retornados pelo servidor)
                setMessage(error.response.data.message || "Erro ao deletar o banco.");
                setMessageTipo("error");
            } else if (error.request) {
                // A requisição foi feita, mas nenhuma resposta foi recebida
                setMessage("Nenhuma resposta do servidor.");
                setMessageTipo("error");
            } else {
                // Outro tipo de erro durante a criação da requisição
                setMessage(`Erro: ${error.message}`);
                setMessageTipo("error");
            }

            setTimeout(() => {
                setMessage("");
                setMessageTipo("");
                setModalDelete(false);
                setId(" ");
            }, 2000);
        }
    };


    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nome</TableColumn>
                    <TableColumn>Ações</TableColumn>
                </TableHeader>
                <TableBody>
                    {banco.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nomeDespesa}</TableCell>
                            <TableCell>
                                <div className="flex flex-row gap-3">
                                    <Tooltip className="" content='Mais detalhes'>
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <GrEdit className='text-buttonAzulClaro' />
                                        </span>
                                    </Tooltip>
                                    <Tooltip className="" content="Inativar">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <ImBlocked className="text-iconeDeBloquiar" />
                                        </span>
                                    </Tooltip>
                                    <Tooltip className="" color="danger" content="Deletar">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon onClick={() => opemModalDelete(item.id)} className="text-red-500" />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Alert severity={messageTipo as 'success' | 'info' | 'warning' | 'error'}>{message}</Alert>
            <ModalDeleteConfiguracoes
                isOpen={modalDelete}
                onClose={() => setModalDelete(false)}
                id={id}
                confirmaEsclusao={() => deletaBanco(id)}
            />
        </>
    );
}
