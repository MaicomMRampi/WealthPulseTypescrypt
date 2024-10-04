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

import { api } from "@/lib/api";
import { Formik } from "formik";
import * as yup from "yup";
import { PlusIcon } from "./iconesCompartilhados/PlusIcon";
import { Alert } from "@mui/material";
import { valorMask } from "./Mask";

type Props = {
    open: boolean;
    onClose: () => void;
    object: any;
    funcao: any;
    dadosInvestmentos: any
};

export default function BasicModal({ open, onClose, object, funcao, dadosInvestmentos }: Props) {
    const [message, setMessage] = useState<string>("");

    const initialValues = {
        qtdvenda: "",
        valorcota: "",
        observacao: ""
    };

    const validationSchema = yup.object().shape({
        qtdvenda: yup.number().required("Campo Obrigatório"),
        valorcota: yup.string().required("Campo Obrigatório"),
        observacao: yup.string().optional(),
    });

    const vendaFii = async (values: any) => {
        try {
            const response = await api.put(`/vendacotasfii`, {
                investimento: object,
                values
            });
            if (response.status === 200) {
                setMessage("Fundo vendido com sucesso");
                setTimeout(() => {
                    setMessage("");
                    funcao();
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.log("Erro ao vender FII:", error);
            setMessage("Falha ao vender. Tente novamente.");
            setTimeout(() => {
                setMessage("");
                funcao();
                // onClose();
            }, 3000);
        }
    };

    const fiiInvestimentos = dadosInvestmentos.filter((dadosInvestmentos: any) => dadosInvestmentos.tipo === 'fii');
    console.log("🚀 ~ BasicModal ~ fiiInvestimentos", fiiInvestimentos)


    const dadosAgrupados = fiiInvestimentos && fiiInvestimentos.reduce((acc: any, item: any) => {
        const { nome, quantidade } = item;

        if (!acc[nome]) {
            acc[nome] = {
                nome,
                quantidade: quantidade,
            };
        } else {
            acc[nome].quantidade += quantidade;
        }

        return acc;
    }, {});
    const arrayAgrupado = Object.values(dadosAgrupados);
    console.log("🚀 ~ BasicModal ~ arrayAgrupado", arrayAgrupado)


    const investimentoSelecionado: any = arrayAgrupado && object?.nome
        ? arrayAgrupado.find((item: any) => item.nome === object.nome)
        : null;


    return (
        <>
            <Modal
                backdrop="opaque"
                hideCloseButton={true}
                isOpen={open}
                onClose={onClose}
                size="md"
                className="bg-BgCardPadrao"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={vendaFii}
                >
                    {({
                        errors,
                        setFieldValue,
                        handleChange,
                        handleSubmit,
                        touched,
                        values
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            <p>Deseja vender cotas do fundo {object.nome ? object.nome : null}?</p>
                                            <p>quantidade disponível: <span className="text-primaryTableHover">{investimentoSelecionado.quantidade}</span></p>

                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="flex flex-col gap-3">
                                                <Input
                                                    autoComplete="off"
                                                    type="number"
                                                    label="Quantidade de cotas"
                                                    name="qtdvenda"
                                                    isInvalid={touched.qtdvenda && Boolean(errors.qtdvenda)}
                                                    value={values.qtdvenda}
                                                    fullWidth
                                                    onChange={handleChange}
                                                />
                                                <Input
                                                    label="Valor por cota"
                                                    name="valorcota"
                                                    isInvalid={touched.valorcota && Boolean(errors.valorcota)}
                                                    value={values.valorcota}
                                                    fullWidth
                                                    onChange={(event) => {
                                                        const { name, value } = event.target;
                                                        if (name === 'valorcota') {
                                                            const maskedValue = valorMask(value);
                                                            setFieldValue(name, maskedValue);
                                                        } else {
                                                            setFieldValue(name, value);
                                                        }
                                                    }}
                                                    startContent={<span className="text-white text-small">R$</span>}
                                                />
                                                <Textarea
                                                    label='Observação'
                                                    name="observacao"
                                                    value={values.observacao}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {values.qtdvenda > investimentoSelecionado.quantidade ? (
                                                <Alert severity="error">Quantidade maior que a disponível</Alert>
                                            ) :
                                                null}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancelar
                                            </Button>
                                            <Button
                                                isDisabled={values.qtdvenda > investimentoSelecionado.quantidade}
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
