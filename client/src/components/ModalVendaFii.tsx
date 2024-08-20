
import { api } from '@/lib/api';
import {
  Button,
  Typography,
  Modal,
  Box,
  Alert,
  TextField
} from '@mui/material'
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react'
import * as yup from 'yup'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal({ open, onclose, status, nome }) {
  const initialValues = {
    qtdvenda: '',
  };

  const validationSchema = yup.object().shape({
    qtdvenda: yup
      .number("Digite Apenas Números")
      .required('Campo Obrigatório'),
  });
  const [message, setMessage] = useState('');
  const [messageTipo, setmessageTipo] = useState('');




  const vendaFii = async (values) => {
    try {
      const response = await api.put(`/vendacotasfii`, {
        nomefii: nome,
        values
      });
      if (response.status === 200) {
        setmessageTipo('success')
        setMessage('Fundo vendido com sucesso');
        const timer = setTimeout(() => {
          setMessage('');
          onclose(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setmessageTipo('error')
      console.error('Erro ao vender FII:', error);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage('');

      }, 2000);

    }
  };

  return (
    <div>

      <Modal
        open={open}
        onClose={onclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            vendaFii(values);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue, touched, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography sx={{ color: 'black' }} id="modal-modal-title" variant="h6" component="h2">
                  Deseja vender cotas do fundo <br /> <b>{nome && nome}</b>
                </Typography>
                <Box>
                  <TextField
                    name="qtdvenda"
                    fullWidth
                    autoFocus
                    onChange={handleChange}
                    error={touched.qtdvenda && Boolean(errors.qtdvenda)}
                    helperText={touched.qtdvenda && errors.qtdvenda}
                  />
                </Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Button onClick={onclose}>Cancelar</Button>
                  <Button type="submit">Confirmar</Button>
                </Typography>
                {message ? <Alert color={messageTipo}>{message}</Alert> : null}
              </Box>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}