import React from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { MdDangerous } from "react-icons/md"
import { api } from "@/lib/api"
import { Alert } from "@mui/material"

interface ObjetoInvestimento {

    [key: string]: any // Caso existam outras propriedades que não foram especificadas
}

interface Props {
    isOpen: any
    onClose: any
    objeto: any
    confirmaEsclusao: any
    message: string,
    messageTipo: any
}

export default function ModalDele({ isOpen, onClose, objeto, confirmaEsclusao, message, messageTipo }: Props) {
    return (
        <>
            <Modal className="bg-BgCardPadrao rounded-lg" backdrop="opaque" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col w-full font-extrabold bg-[#C20E4D]">Deseja fazer a exclusão</ModalHeader>
                            <ModalBody>
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="bordered" color="primary" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button variant="ghost" color="danger" onClick={confirmaEsclusao} className="text-red-500">
                                    Excluir
                                </Button>
                            </ModalFooter>
                            {message ? <Alert severity={messageTipo ? messageTipo : 'success' as any}>{message}</Alert> : null}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
