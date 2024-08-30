"use client"
import React from "react";
import { Modal, ModalContent, Textarea, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function App({ open, onClose, observacao, onSubmit }) {
    const [observacaoNomeDespesa, setObservacaoNomeDespesa] = useState('');
    const handleSubmit = () => {
        onSubmit(observacaoNomeDespesa);
        onClose();
    };


    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={open}
                onClose={onClose}
                placement="center"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
                className="bg-black rounded-lg p-4 text-white"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="text-center">
                                <ModalHeader >Deseja inativar?</ModalHeader>
                                <p>{observacao.nomeDespesa}</p>
                            </div>
                            <ModalBody className="text-white bg-black">
                                <Textarea
                                    label="Oservação"
                                    onChange={(e) => setObservacaoNomeDespesa(e.target.value)}
                                    placeholder="Descreva o motivo da inativação"
                                    className="max-w-xs"
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="solid" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="success" variant="light" onClick={() => handleSubmit()}>
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}