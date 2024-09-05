
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ModalAddJuros from './ModalAddJuros';
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import currency from "./Currency";

interface Props {
    open: boolean
    onClose: () => void
    data: any
    funcao: any
}

export default function BasicModal({ open, onClose, data, funcao }: Props) {
    const [openModal, setOpenModal] = useState(false)
    const [investimento, setInvestimento] = useState<any>(data)

    const dadosAgrupados = data && data.reduce((acc: any, item: any) => {
        const { nomeInvestimento, valor, idUser, tipoDeInvestimento } = item;

        if (!acc[nomeInvestimento] && idUser) {
            acc[nomeInvestimento] = {
                nomeInvestimento,
                valor: valor,
                idUser: idUser,
                tipoDeInvestimento: tipoDeInvestimento
            };
        } else {
            acc[nomeInvestimento].tipoDeInvestimento = tipoDeInvestimento
            idUser && (acc[nomeInvestimento].idUser = idUser);
            acc[nomeInvestimento].valor += valor;
        }

        return acc;
    }, {});
    const arrayAgrupado = dadosAgrupados ? Object.values(dadosAgrupados) : [];

    if (!data) {
        return <div>Carregando...</div>
    }

    const opemModalJuros = (index: any) => {
        setInvestimento(arrayAgrupado[index])
        setOpenModal(true)

    }

    return (
        <div>
            {/* <ModalVendaFii
                nome={nomeVendaFii}
                open={openModal}
                onclose={() => setOpenModal(false)}

            /> */}
            <Modal
                isOpen={open}
                onClose={onClose}
                hideCloseButton={true}
                placement="center"
                // className="bg-primaryTable"
                className="bg-BgCardPadrao "
                backdrop="opaque"
                size="2xl"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",

                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalBody>
                                <Table classNames={{ 'wrapper': 'max-h-[382px] bg-BgCardPadrao ' }} >
                                    <TableHeader>

                                        <TableColumn><b>Nome do Investimento</b></TableColumn>
                                        <TableColumn align="center"><b>Valor</b></TableColumn>
                                        <TableColumn align="center"><b>Adicionar Lucro</b></TableColumn>
                                    </TableHeader>
                                    <TableBody className="bg-primaryTable">
                                        {arrayAgrupado && arrayAgrupado.map((row: any, index: number) => (
                                            <TableRow className="border-b-1 border-white" key={row.id}>
                                                <TableCell scope="row">
                                                    {row.nomeInvestimento}
                                                </TableCell>
                                                <TableCell align="center">{currency(row.valor)}</TableCell>
                                                <TableCell align="center"><Button color="success" onPress={onClose} endContent={<HiOutlinePlus />} onClick={() => opemModalJuros(index)} >Adicionar</Button></TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
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
            <ModalAddJuros
                open={openModal}
                onClose={() => setOpenModal(false)}
                object={investimento}
                funcao={funcao}
            />
        </div>
    )
}