
type Props = {
    paymentData: any;
    accessToken: string;
};

const createCharge = async ({ accessToken, paymentData }: Props) => {
    console.log("🚀 ~ createCharge ~ paymentData", paymentData)
    console.log("🚀 ~ createCharge ~ accessToken", accessToken)
    const axios = require('axios');

    try {
        const paymentConfig = {
            transaction_amount: 0.01, // Valor total da compra
            // date_of_expiration: paymentData.expiresAt,
            payment_method_id: 'pix',
            payer: {
                first_name: paymentData.name,
                email: paymentData.email,
            },
        };

        const data = JSON.stringify(paymentConfig);
        console.log("🚀 ~ createCharge ~ data", data)

        const config = {
            method: 'post',
            url: 'https://api.mercadopago.com/v1/payments',
            headers: {
                'Content-Type': 'application/json',
                'X-Idempotency-Key': paymentData.id, // Controle para não repetir 2x a mesma cobrança
                Authorization: `Bearer ${accessToken}`,
            },
            data: data,
        };

        const response = await axios(config);
        console.log("🚀 ~ createCharge ~ response", response.data)
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const verifyPaymentStatus = async (id: string, accessToken: string) => {
    const axios = require('axios');

    try {
        if (!id) throw new Error('Id da cobrança vazio');
        if (!accessToken) throw new Error('Erro ao verificar o status do pagamento');

        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export { createCharge, verifyPaymentStatus }