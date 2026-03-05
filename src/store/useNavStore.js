import { create } from 'zustand';

export const useNavStore = create((set) => ({
    isNavVisible: false,
    setNavVisible: (visible) => set({ isNavVisible: visible }),
}));
