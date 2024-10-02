"use client";
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
} from "@nextui-org/react";
import { valorMask } from "./Mask";
import { api } from "@/lib/api";
import { Formik } from "formik";
import * as yup from "yup";
import { PlusIcon } from "./iconesCompartilhados/PlusIcon";
import { Alert } from "@mui/material";

type Props = {
    open: boolean;
    onClose: any;
    object: any;
};

export default function App({ open, onClose, object }: Props) {
    const [message, setMessage] = useState("");

    const initialValues = {
        valorjuros: "",
        observacao: "",
    };

    const validationSchema = yup.object().shape({
        valorjuros: yup.string().required("Campo Obrigatório"),
        observacao: yup.string().optional(),
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await api.post('/sacarvencido', {
                investimento: object,
                values
            })

            setMessage("Provento adicionado com sucesso!");
            if (response.status === 200) {

            }

            setTimeout(() => {
                setMessage("");
                onClose();
            }, 3000);

        } catch (error) {
            console.error("Erro ao adicionar proventos", error);
            setMessage("Falha ao adicionar proventos. Tente novamente.");
        }
    };

    return (
        <>
            <Modal
                backdrop="opaque"
                hideCloseButton={true}
                isOpen={open}
                onClose={onClose}
                className="bg-BgCardPadrao"
                size="md"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        errors,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Investimento Vencido ou Saque Adiantado
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="flex flex-col gap-3">
                                                <Input
                                                    label='Valor total atual'
                                                    name="valorjuros"
                                                    isInvalid={
                                                        errors.valorjuros && touched.valorjuros
                                                            ? true
                                                            : false
                                                    }
                                                    startContent={
                                                        <span className="text-white text-small">R$</span>
                                                    }
                                                    value={values.valorjuros}
                                                    fullWidth
                                                    onChange={(event) => {
                                                        const { name, value } = event.target;
                                                        const maskedValue = valorMask(value);
                                                        setFieldValue(name, maskedValue);
                                                    }}
                                                />
                                                <Textarea
                                                    label='Observação'
                                                    name="observacao"
                                                    value={values.observacao}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={onClose}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                color="success"
                                                type="submit"
                                                endContent={<PlusIcon />}
                                            >
                                                Confirmar
                                            </Button>
                                        </ModalFooter>
                                        {message && (
                                            <Alert severity="success">{message}</Alert>
                                        )}
                                    </>
                                )}
                            </ModalContent>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    );
}
