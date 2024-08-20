import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";



interface ModalObservacaoProps {
    open: boolean;
    onClose: () => void;
    observacao: any; // Substitua "any" pelo tipo adequado, se possível.
}



export default function App({ open, onClose, observacao }: ModalObservacaoProps) {

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
                            <ModalHeader className="text-center">{observacao.valorOpenModal == 1 ? 'Motivo da Inativação' : 'Observação da Despesa ou Investimento'}</ModalHeader>
                            <ModalBody className="text-white bg-black">
                                {observacao.valorOpenModal == 1 ?
                                    <Textarea
                                        label='Motivo da Inativação'
                                        value={observacao.observacaoInativacao}
                                    />
                                    :
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            label="Responsavel pela Despesa"
                                            value={observacao.responsavel}
                                        />
                                        <Input
                                            label="Pagador"
                                            value={observacao.compradorPagador}
                                        />
                                    </div>
                                }
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