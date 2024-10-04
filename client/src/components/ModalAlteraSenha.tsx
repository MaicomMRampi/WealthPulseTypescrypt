"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { MdDangerous } from "react-icons/md";
import { api } from "@/lib/api";
import { cpfMask } from "./Mask";

interface ObjetoInvestimento {

    [key: string]: any; // Caso existam outras propriedades que não foram especificadas
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: any
}

export default function ModalDele({ isOpen, onClose, onSubmit }: Props) {
    const [valor, setValor] = useState<string>('');
    console.log("🚀 ~ ModalDele ~ valor", valor.length)


    const handleConfirmar = () => {
        onSubmit(valor); // Passa o valor do CPF para a função alteraSenha
    };


    return (
        <>
            <Modal
                className="bg-BgCardPadrao rounded-lg p-4"
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onClose}
                hideCloseButton={true}
                isKeyboardDismissDisabled={true}
                isDismissable={false}
            >

                <ModalContent>
                    {() => (
                        <>
                            <ModalBody className="text-center flex flex-col gap-4">
                                <p>Esqueci minha senha </p>
                                <p className="text-justify">Para redefinir sua senha, informe seu CPF cadastrado em sua conta e enviaremos um e-mail contendo a sua nova senha provisória.</p>
                                <Input
                                    variant="faded"
                                    label="Digite seu CPF"
                                    value={valor}
                                    maxLength={14}
                                    onChange={(e) => setValor(cpfMask(e.target.value))}
                                />
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="light" color="danger" onClick={() => setValor('')}
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button isDisabled={valor.length !== 14} onClick={handleConfirmar} variant="solid" color="success" >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
