"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Alert } from "@mui/material";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (value: string) => void,
    message: string,
    messageTipo: 'error' | 'warning' | 'info' | 'success' // Corrigindo o tipo aqui
}

export default function App({ isOpen, onClose, onSubmit, message, messageTipo }: Props) {
    const [value, setValue] = useState('');
    return (
        <>
            <Modal className="bg-black rounded-lg " backdrop="opaque" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col w-full text-md font-extrabold ">Deseja Adicionar um Novo Tipo de Despesa?</ModalHeader>
                            <ModalBody>
                                <Input onChange={(e) => setValue(e.target.value)} minLength={4} label="Novo tipo de despesa" />
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
                            {message ? <Alert severity={messageTipo}>{message}</Alert> : null}
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}
