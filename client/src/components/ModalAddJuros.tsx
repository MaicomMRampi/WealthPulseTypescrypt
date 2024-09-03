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
} from "@nextui-org/react";
import { valorMask } from "./Mask";
import { api } from "@/lib/api";
import { Formik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@nextui-org/date-picker";
import {
    parseDate,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { PlusIcon } from "./iconesCompartilhados/PlusIcon";
import { Alert } from "@mui/material";

type Props = {
    open: boolean;
    onClose: any;
    object: any;
    funcao: any;
};

export default function App({ open, onClose, object, funcao }: Props) {
    const [message, setMessage] = useState("");

    const initialValues = {
        valorjuros: "",
        datapagamento: today(getLocalTimeZone()),
    };

    const validationSchema = yup.object().shape({
        valorjuros: yup.string().required("Campo Obrigatório"),
        datapagamento: yup.date().required("Campo é obrigatório"),
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await api.post("/addjuros", {
                values,
                dadosInvestimento: object,
            });

            setMessage("Provento adicionado com sucesso!");
            if (response.status === 200) {
                funcao();
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
                                            Adicionar Proventos?
                                        </ModalHeader>
                                        <ModalBody>
                                            <p>
                                                Deseja adicionar proventos ao fundo{" "}
                                                <span className="font-bold">
                                                    {object.nomeInvestimento}
                                                </span>
                                                ?
                                            </p>
                                            <div className="flex flex-col gap-3">
                                                <Input
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
                                                <I18nProvider locale="pt-BR">
                                                    <DatePicker
                                                        isInvalid={
                                                            errors.datapagamento &&
                                                                touched.datapagamento
                                                                ? true
                                                                : false
                                                        }
                                                        name="datapagamento"
                                                        label="Data pagamento"
                                                        minValue={today(getLocalTimeZone())}
                                                        onChange={(val) =>
                                                            setFieldValue("datapagamento", val)
                                                        }
                                                        defaultValue={today(getLocalTimeZone())}
                                                    />
                                                </I18nProvider>
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
