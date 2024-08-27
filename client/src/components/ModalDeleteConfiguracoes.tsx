import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { MdDangerous } from "react-icons/md";
import { api } from "@/lib/api";

interface ObjetoInvestimento {

    [key: string]: any; // Caso existam outras propriedades que não foram especificadas
}

interface Props {
    isOpen: boolean; onClose: () => void; confirmaEsclusao: () => Promise<void>; message?: string, id: any
}



export default function ModalDele({ isOpen, onClose, confirmaEsclusao, message, id }: Props) {
    return (
        <>
            <Modal className="bg-black rounded-lg" backdrop="opaque" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col w-full font-extrabold bg-[#C20E4D]">Deseja fazer a exclusão</ModalHeader>
                            <ModalBody>
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="light" className="text-green-500" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button variant="ghost" color="danger" onClick={confirmaEsclusao} className="text-red-500">
                                    Excluir
                                </Button>
                            </ModalFooter>
                            <p className="text-green-700">{message ? message : ""}</p>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
