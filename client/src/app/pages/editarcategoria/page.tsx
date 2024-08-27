"use client"
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { api } from "@/lib/api";
import useToken from '@/components/hooks/useToken';
import { ImBlocked } from "react-icons/im";
import { DeleteIcon } from "@/components/iconesCompartilhados/DeleteIcon";
import { GrEdit } from "react-icons/gr";
import ModalDeleteConfiguracoes from '@/components/ModalDeleteConfiguracoes';
export default function EditarInstituicao() {
    const { tokenUsuario } = useToken()
    const [banco, setBanco] = useState([])
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState<String>()


    const buscaBanco = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get('/buscacategoria', {
                params: {
                    idUser: tokenUsuario?.id,
                }
            })
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
        if (!tokenUsuario) return
        try {
            const response = await api.delete('/deletacategoria', {
                data: {
                    id: tokenUsuario?.id,
                    idBanco: id
                }
            })
            buscaBanco()
            if (response.status == 200) {
                setTimeout(() => {
                    setModalDelete(false)
                    setId(" ")
                })
            }

        }
        catch (error) {
        }
    }

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
                            <TableCell>{item.nomeCategoria}</TableCell>
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
            <ModalDeleteConfiguracoes
                isOpen={modalDelete}
                onClose={() => setModalDelete(false)}
                id={id}
                confirmaEsclusao={() => deletaBanco(id)}
            />
        </>
    );
}
