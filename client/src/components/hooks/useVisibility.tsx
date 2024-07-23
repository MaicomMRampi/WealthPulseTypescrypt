import { create } from "zustand";
interface VisibilityState {
    visibility: boolean;
    toggleVisibility: () => void;
}
const useVisibility = create<VisibilityState>((set) => ({
    visibility: false,
    toggleVisibility: () => set((state) => ({ visibility: !state.visibility })),
}));


export default useVisibility