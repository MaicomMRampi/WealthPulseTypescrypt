
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ModalVendaFii from './ModalVendaFii';
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

export default function BasicModal({ open, onClose, data }) {
    const [openModal, setOpenModal] = useState(false)
    const [fechaModal, setfechaModal] = useState(false)
    const [nomeVendaFii, setnomeVendaFii] = useState('')
    // Crie um objeto para armazenar os dados agrupados
    const dadosAgrupados = data && data.reduce((acc, item) => {
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

    const opemModalEVendafii = (id) => {
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
                className="bg-primaryTable"
                backdrop="opaque"
                size="2xl"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                    content: "bg-black rounded-lg p-4 text-white",
                }}
            >

                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalBody>
                                <Table classNames={{ 'wrapper': 'max-h-[382px] bg-primaryTable text-white' }} >
                                    <TableHeader>

                                        <TableColumn><b>Nome Do Fii</b></TableColumn>
                                        <TableColumn align="center"><b>Quantidade de Cotas</b></TableColumn>
                                        <TableColumn align="center"><b>Vender</b></TableColumn>
                                    </TableHeader>

                                    <TableBody className="bg-primaryTable">

                                        {arrayAgrupado && arrayAgrupado.map((row) => (
                                            <TableRow className="border-b-1 border-white" hover key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.nome}
                                                </TableCell>
                                                <TableCell align="center">{row.quantidade}</TableCell>
                                                <TableCell align="center"><Button color="success" onPress={onClose} endContent={<HiOutlinePlus />} size="xs" onClick={() => opemModalEVendafii(row.nome)} >Vender</Button></TableCell>
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