import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ColorState {
    color: string;
    palette: string[];
    history: string[];
    image: string | null;
    setColor: (color: string) => void;
    setPalette: (palette: string[]) => void;
    addToHistory: (color: string) => void;
    setImage: (image: string | null) => void;
    clearHistory: () => void;
}

export const useColorStore = create<ColorState>()(
    persist(
        (set) => ({
            color: '#2596be', // Default color
            palette: [],
            history: [],
            image: null,
            setColor: (color) => set({ color }),
            setPalette: (palette) => set({ palette }),
            addToHistory: (color) =>
                set((state) => {
                    const newHistory = [color, ...state.history.filter((c) => c !== color)].slice(0, 20);
                    return { history: newHistory };
                }),
            setImage: (image) => set({ image }),
            clearHistory: () => set({ history: [] }),
        }),
        {
            name: 'color-storage', // unique name
        }
    )
);
