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
    const [fundoImobiliario, setFundoImobiliario] = useState([])
    const [modalDelete, setModalDelete] = useState(false)
    const [valor, setValor] = useState<number>()
    const [id, setId] = useState<String>()


    const buscaNomeAção = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get('/buscanomeacao', {
                params: {
                    id: tokenUsuario?.id,
                }
            })
            setBanco(response.data)

        }
        catch (error) {
        }
    }

    const buscaNomeFundoImobiliario = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get('/buscanomefundonovo', {
                params: {
                    id: tokenUsuario?.id,
                }
            })
            setFundoImobiliario(response.data)

        }
        catch (error) {
        }
    }

    useEffect(() => {
        buscaNomeAção()
        buscaNomeFundoImobiliario()
    }, [])

    const opemModalDelete = (id: any, valor: number) => {
        setValor(valor)
        setId(id)
        setModalDelete(true)
    }

    const deletaBanco = async (id: any) => {
        if (!tokenUsuario) return
        try {
            if (valor == 1) {
                const response = await api.delete('/deletanomefundonovo', {
                    data: {
                        id: tokenUsuario?.id,
                        idBanco: id
                    }
                })
                if (response.status == 200) {
                    setTimeout(() => {
                        setValor(0)
                        setModalDelete(false)
                        setId(" ")
                    })
                }

            } else if (valor == 2) {
                const response = await api.delete('/deletanomeacao', {
                    data: {
                        id: tokenUsuario?.id,
                        idBanco: id
                    }
                })
                if (response.status == 200) {
                    setTimeout(() => {
                        setValor(0)
                        setModalDelete(false)
                        setId(" ")
                    })
                }
            }
            buscaNomeAção()
            buscaNomeFundoImobiliario()
        }
        catch (error) {
        }
    }

    return (
        <>
            <div className="w-[95%] mx-auto">
                <div className="w-full  grid grid-cols-1  md:grid-cols-2 gap-3 pt-3">
                    <div>
                        <p className="text-xl font-semibold text-center">Nome fundos imobiliários</p>
                        <Table aria-label="Example static collection table">
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Nome</TableColumn>
                                <TableColumn>Ações</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {fundoImobiliario.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.nomeFundo}</TableCell>
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
                                                        <DeleteIcon onClick={() => opemModalDelete(item.id, 1)} className="text-red-500" />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-center">Nome Ações</p>
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
                                        <TableCell>{item.nomeAcao}</TableCell>
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
                                                        <DeleteIcon onClick={() => opemModalDelete(item.id, 2)} className="text-red-500" />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>
            </div >
            <ModalDeleteConfiguracoes
                isOpen={modalDelete}
                onClose={() => setModalDelete(false)}
                id={id}
                confirmaEsclusao={() => deletaBanco(id)}
            />
        </>
    );
}
