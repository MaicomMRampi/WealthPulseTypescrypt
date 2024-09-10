import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Formik } from 'formik';
import * as yup from 'yup';
// import { Alert } from "@mui/material";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { Alert } from "@mui/material";

interface ModalNovaCategoriaProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    message: any;
    messagemTipo: any;
}


export default function App({ open, onClose, onSubmit, message, messagemTipo }: ModalNovaCategoriaProps) {
    const initialValues = {
        categoria: '',
    };

    const validationSchema = yup.object().shape({
        categoria: yup
            .string()
            .required('Campo Obrigatório'),
    });

    const mandaValorAtualizado = async (values: Object) => {
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
                                        <ModalHeader className="flex flex-col gap-1 text-center text-white"> Nova Categoria</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                onChange={handleChange}
                                                autoComplete="off"
                                                label="Nome da categoria"
                                                type="text"
                                                variant="bordered"
                                                name="categoria"
                                                className="border-white text-white"

                                            />
                                            {errors.categoria && touched.categoria && <p className="text-red-500 text-xs">{errors.categoria}</p>}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button endContent={<PiPaperPlaneTiltFill />} type="submit" color="success" >
                                                Salvar
                                            </Button>
                                        </ModalFooter>

                                        {message && <Alert color={'success'} >{message}</Alert>}
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
