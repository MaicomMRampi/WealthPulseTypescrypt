"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Alert } from "@mui/material";

interface Props {
    isOpen: boolean,
    onClose: any,
    onSubmit: any,
    message: string,
    messageTipo: string
}

export default function App({ isOpen, onClose, onSubmit, message, messageTipo }: Props) {
    const [value, setValue] = useState('');
    return (
        <>
            <Modal className="bg-BgCardPadrao rounded-lg " backdrop="opaque" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col w-full text-md font-extrabold ">Deseja Adicionar um Novo Tipo de Despesa?</ModalHeader>
                            <ModalBody>
                                <Input variant="bordered" onChange={(e) => setValue(e.target.value)} minLength={4} label="Novo tipo de despesa" />
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="light" color="danger" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={() => onSubmit(value)}
                                    color="success"
                                >
                                    Salvar
                                </Button>
                            </ModalFooter>
                            {message ? <Alert severity={messageTipo as any}>{message}</Alert> : null}
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}
