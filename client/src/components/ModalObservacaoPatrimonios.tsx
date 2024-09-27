import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

interface Props {
    open: boolean,
    onClose: any,
    observacao: any
}

interface Observacao {
    responsavel: string,
    paganete: string,
    observacao: string
}

export default function App({ open, onClose, observacao }: Props) {


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
                            <ModalHeader className="text-center">Observação</ModalHeader>
                            <ModalBody className="text-white bg-black">

                                <Input
                                    label="Localização"
                                    defaultValue={observacao.localizacao}
                                    fullWidth
                                />
                                <Textarea
                                    label="Observação"
                                    defaultValue={observacao.observacao}
                                    fullWidth
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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
