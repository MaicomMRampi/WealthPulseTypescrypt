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
    Select,
    SelectItem,

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
    funcao: any
};

const motivo = [
    {
        nome: 'Vencido',
    },

    {
        nome: 'Retirada antes do prazo',
    },
];

export default function App({ open, onClose, object, funcao }: Props) {
    const [message, setMessage] = useState("");

    const initialValues = {
        valorjuros: "",
        observacao: "",
        motivo: "",
    };

    const validationSchema = yup.object().shape({
        valorjuros: yup.string().required("Campo Obrigatório"),
        observacao: yup.string().optional(),
        motivo: yup.string().required("Campo Obrigatório"),
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await api.post('/sacarvencido', {
                investimento: object,
                values
            })

            setMessage("Registro adicionado a transações");
            if (response.status === 200) {
            }

            setTimeout(() => {
                funcao()
                setMessage("");
                onClose();
            }, 3000);

        } catch (error) {
            console.log("Erro ao adicionar ", error);
            setMessage("Falha ao adicionar. Tente novamente.");
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
                                            <p className="text-[15px] text-orange-400">Obs: Ao confirmar, o investimento não contabilizará mais nos investimentos.</p>
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
                                                <Select
                                                    isInvalid={touched.motivo && !!errors.motivo}
                                                    name="motivo"
                                                    fullWidth
                                                    label="Motivo ?"
                                                    onChange={handleChange}
                                                >
                                                    {/* Lista de tipos de títulos */}
                                                    {motivo.map(item => (
                                                        <SelectItem value={item.nome} key={item.nome}>
                                                            {item.nome}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
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
