"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Alert } from "@mui/material";
export default function App({ isOpen, onClose, objetoInvestimento, onSubmit, message, messageTipo }) {
    const [value, setValue] = useState('');
    console.log("🚀 ~ App ~ value", value)
    return (
        <>
            <Modal className="bg-black rounded-lg " backdrop="blur" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col w-full text-md font-extrabold ">Deseja Adicionar um Novo Tipo de Despesa?</ModalHeader>
                            <ModalBody>
                                <Input onChange={(e) => setValue(e.target.value)} minLength={4} placeholder="Insira o novo Tipo de Despesa" />
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="light" color="danger" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={() => onSubmit(value)}
                                    color="success"
                                    auto
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
