import { create } from 'zustand';

interface User {
    cpf: string;
    dataCadastro: Date;
    email: string;
    id: number;
    imageUrl: string | null;
    nome: string;
    senha: string;
    valorOrcamentoMensal: number | null;
    dataProximoPagamento: any,
    statusPagamento: number,
    dataExpiracaoAcesso: any
    openModal: number,
    dataExpiracao: any,
    statusFinanceiro: number
}

interface BearState {
    tokenUsuario: User | null;
    setTokenUsuario: (token: User | null) => void; // Ajuste para aceitar null também
}

const useToken = create<BearState>((set) => ({
    tokenUsuario: null,
    setTokenUsuario: (token: User | null) => set({ tokenUsuario: token }),
}));

export default useToken;
