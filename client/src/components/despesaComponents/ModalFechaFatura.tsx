import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { Alert } from "@mui/material";
import AlteraVisualizacaoDataYYYYMM from "../funcoes/alteraVisualizacaoDataYYYMM";

interface Props {
    onClose: () => void,
    // observacao: any
    onSubmit: any
    open: boolean;
    mes: string | undefined | any
    mensagem: any
}

// interface Observacao {
//     responsavel: string,
//     paganete: string,
//     onSubmit: any,
//     mensagem: string
// }

export default function App({ open, onClose, onSubmit, mes, mensagem }: Props) {

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
                            <ModalHeader className="text-center">Deseja Fechar as Despesas do Mês: {AlteraVisualizacaoDataYYYYMM(mes)} ?</ModalHeader>
                            <ModalBody className="text-white k">

                                <Alert severity="warning" >Obs: Ao inativar não será possível fazer a alteração de dados</Alert>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" variant="light" onClick={() => onSubmit()}>
                                    Confirmar
                                </Button>
                                <Button color="danger" variant="solid" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                            {mensagem ? <Alert>{mensagem}</Alert> : null}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
