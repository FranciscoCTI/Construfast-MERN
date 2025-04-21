import { create } from 'zustand';

export const useServiceProviderStore = create((set) => ({
    serviceProviders: [],
    setServiceProvider: (serviceProviders) => set({ serviceProviders }),
    fetchServiceProviders: async () => {
        const res = await fetch('/api/serviceProviders');
        console.log("📡 Response:", res);
        const data = await res.json();
        set({ serviceProviders: data.datum });
    },
}));