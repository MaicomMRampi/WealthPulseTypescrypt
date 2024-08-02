import { create } from "zustand";
interface VisibilityState {
    visibilityCampo: boolean;
    toggleVisibilityCampo: () => void;
}
const useVisibilityCampo = create<VisibilityState>((set) => ({
    visibilityCampo: false,
    toggleVisibilityCampo: () => set((state) => ({ visibilityCampo: !state.visibilityCampo })),
}));


export default useVisibilityCampo