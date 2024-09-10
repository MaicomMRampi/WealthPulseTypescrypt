import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { Alert } from "@mui/material";
// import { PiPaperPlaneTiltFill } from "react-icons/pi";

interface ModalFormaPagamentoProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    message: any;
    messagemTipo: any;
}

export default function App({ open, onClose, onSubmit, message, messagemTipo }: ModalFormaPagamentoProps) {
    const initialValues = {
        formapagamento: '',
    };

    const validationSchema = yup.object().shape({
        formapagamento: yup
            .string()
            .required('Campo Obrigatório'),
    });

    const mandaValorAtualizado = async (values: any) => {
        try {
            onSubmit(values);
        } catch (error) {
            console.error('Erro ao atualizar os valores:', error);
        }
    };

    return (
        <>
            <Modal
                isOpen={open}
                placement="center"
                onClose={onClose}
                className="bg-backgroundModais rounded-lg p-4" backdrop="opaque"
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        mandaValorAtualizado(values);
                    }}
                >
                    {({ errors, handleChange, handleSubmit, touched, values }) => (
                        <form onSubmit={handleSubmit}>

                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 text-center text-white"> Forma de Pagamento</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                onChange={handleChange}
                                                autoComplete="off"
                                                label="Nome da formaPagamento"
                                                type="text"
                                                variant="bordered"
                                                name="formapagamento"
                                                className="border-white text-white"

                                            />
                                            {errors.formapagamento && touched.formapagamento && <p className="text-red-500 text-xs">{errors.formapagamento}</p>}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button
                                                endContent={<PiPaperPlaneTiltFill />}
                                                type="submit" color="success" >
                                                Salvar
                                            </Button>
                                        </ModalFooter>
                                        {message ? (
                                            <Alert severity={messagemTipo as "success" | "error" | "warning" | "info"}>{message}</Alert>

                                        ) :
                                            null
                                        }
                                    </>
                                )}
                            </ModalContent>
                        </form>
                    )}
                </Formik>
            </Modal >
        </>
    );
}
