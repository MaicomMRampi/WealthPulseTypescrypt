import { create } from "zustand";

interface VisibilityState {
    idPatrimonio: any;
    setIdPtrimonio: (id: any) => void;  // Aceita o id como argumento
}

const useIdPtrimonio = create<VisibilityState>((set) => ({
    idPatrimonio: null,
    setIdPtrimonio: (id: any) => set(() => ({ idPatrimonio: id })),  // Usa o id para atualizar o estado
}));

export default useIdPtrimonio;
