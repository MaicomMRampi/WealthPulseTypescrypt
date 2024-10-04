import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert } from "@mui/material";
import { PiPaperPlaneTiltFill } from "react-icons/pi";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    message: any;
    messageTipo: any;
}

export default function App({ open, onClose, onSubmit, message, messageTipo }: Props) {
    const initialValues = {
        instituicao: '',
    };

    const validationSchema = yup.object().shape({
        instituicao: yup
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
                className="bg-BgCardPadrao rounded-lg p-4" backdrop="opaque"
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
                                        <ModalHeader className="flex flex-col gap-1 text-center">Nova Instituição</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                onChange={handleChange}
                                                autoComplete="off"
                                                label="Nome da Instituição"
                                                type="text"
                                                variant="bordered"
                                                name="instituicao"
                                                className="border-white"
                                                isInvalid={errors.instituicao && touched.instituicao ? true : false}
                                            />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button endContent={<PiPaperPlaneTiltFill />} type="submit" color="success" >
                                                Salvar
                                            </Button>
                                        </ModalFooter>
                                        {message ? <Alert severity={messageTipo}>{message}</Alert> : null}
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
