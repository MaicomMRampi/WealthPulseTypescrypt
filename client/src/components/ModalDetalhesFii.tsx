
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ModalVendaFii from './ModalVendaFii';
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

interface Props {
    open: boolean
    onClose: () => void
    data: any
}

export default function BasicModal({ open, onClose, data }: Props) {
    const [openModal, setOpenModal] = useState(false)
    const [fechaModal, setfechaModal] = useState(false)
    const [nomeVendaFii, setnomeVendaFii] = useState('')
    // Crie um objeto para armazenar os dados agrupados

    const dadosAgrupados = data && data.reduce((acc: any, item: any) => {
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



    if (!data) {
        return <div>Carregando...</div>
    }

    const opemModalEVendafii = (id: any) => {
        setnomeVendaFii('')
        setOpenModal(true)
        setnomeVendaFii(id)

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

                                        <TableColumn><b>Nome Do Fii</b></TableColumn>
                                        <TableColumn align="center"><b>Quantidade de Cotas</b></TableColumn>
                                    </TableHeader>

                                    <TableBody className="bg-primaryTable">

                                        {arrayAgrupado && arrayAgrupado.map((row: any) => (
                                            <TableRow className="border-b-1 border-white" key={row.id}>
                                                <TableCell scope="row">
                                                    {row.nome}
                                                </TableCell>
                                                <TableCell align="center">{row.quantidade}</TableCell>
                                                {/* <TableCell align="center"><Button color="success" onPress={onClose} endContent={<HiOutlinePlus />} onClick={() => opemModalEVendafii(row.nome)} >Vender</Button></TableCell> */}
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
        </div>
    )
}