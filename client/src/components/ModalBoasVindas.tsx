import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { MdDangerous } from "react-icons/md";
import { api } from "@/lib/api";

interface ObjetoInvestimento {

    [key: string]: any; // Caso existam outras propriedades que não foram especificadas
}

interface Props {
    isOpen: boolean;
    onClose: any;
}

export default function ModalDele({ isOpen, onClose }: Props) {
    return (
        <>
            <Modal size="2xl" className="bg-BgCardPadrao rounded-lg" backdrop="opaque" isOpen={isOpen} onClose={onClose} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-row w-full font-semibold gap-2">Bem-vindo ao <span className="text-primaryTableHover"> Fluxo do Dinheiro!</span></ModalHeader>
                            <ModalBody>
                                <p>Olá! Estamos muito felizes em ter você conosco. Para começar, você terá <span className="text-primaryTableHover">15 dias</span> de acesso gratuito ao nosso sistema, onde poderá explorar todas as funcionalidades que desenvolvemos para ajudar você a gerenciar suas finanças de forma eficaz.</p>
                                <p>Agradecemos por seu cadastro e esperamos que o sistema atenda as suas necessidades. Qualquer dúvida, estamos à disposição para ajudar.</p>
                                <p>Bom proveito!</p>
                            </ModalBody>
                            <ModalFooter className="gap-6">
                                <Button variant="light" className="text-green-500" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
