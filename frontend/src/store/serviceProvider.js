import { create } from 'zustand';
import ServiceProvider from '../../../backend/models/serviceProvider.model';

export const useServiceProviderStore = create((set) => ({
    serviceProviders: [],
    setServiceProvider: (serviceProviders) => set({ serviceProviders }),
    fetchServiceProviders: async () => {
        const res = await fetch('/api/serviceProviders');
        console.log("📡 Response:", res);
        const data = await res.json();
        set({ serviceProviders: data.datum });
    },
    createServiceProvider: async (newServiceProvider) => {
        if (!newServiceProvider.name || !newServiceProvider.image || !newServiceProvider.phone) {
            return { success: false, message: "Please fill in all the fields" };
        }
        try {
            const res = await fetch('api/serviceProviders', {
                method: 'POST',
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newServiceProvider),
            });
            const data = await res.json();
            set((state) => ({ serviceProviders: [...state.serviceProviders, data.data] }));
            return { success: true, message: "serviceProvider created succesfully" };
        }
        catch {
            return { success: false, message: "Error creating the serviceProvider" };
        }
    },
    removeServiceProvider: async (pid) => {
        const res = await fetch(`/api/serviceProviders/${pid}`, { method: 'DELETE' });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        set((state) => ({ serviceProviders: state.serviceProviders.filter((serviceProvider) => serviceProvider._id !== pid) }));
        return { success: true, message: data.message };
    },
    editServiceProvider: async (pid, updatedSp) => {
        const res = await fetch(`api/serviceProviders/${pid}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSp)
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ serviceProviders: state.serviceProviders.map((serviceProvider) => (serviceProvider._id === pid ? data.data : serviceProvider)) }));
        return { success: true, message: data.message };

    }
}));