import { StaticImageData } from 'next/image';
import {create} from 'zustand';
import frame1 from '../assets/frame1.png';
interface DataStore {
    frame: StaticImageData | null;
    setFrame: (data: StaticImageData) => void;
    clearData: () => void;
}

const useDataStore = create<DataStore>((set) => ({
    frame: frame1,
    setFrame: (data: StaticImageData) => set({ frame: data }),
    clearData: () => set({ frame: null }),
}))

export default useDataStore;