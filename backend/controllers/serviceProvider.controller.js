import ServiceProvider from '../models/serviceProvider.model.js';
import mongoose from 'mongoose';

export const getServiceProviders = async (req, res) => {
    try {
        const serviceProv = await ServiceProvider.find({});
        return res.status(200).json({
            count: serviceProv.length,
            datum: serviceProv
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

export const createServiceProvider = async (req, res) => {
    const sp = req.body;

    if (!sp.name || !sp.image || !sp.city || !sp.disciplines || !sp.phone || !sp.lat || !sp.lng) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newSp = new ServiceProvider(sp);

    try {
        await newSp.save();
        res.status(201).json({ success: true, data: sp });
    }
    catch (error) {
        console.error('Error in creating a product:', error.message);
        res.status(500).json({ success: false, message: 'server Error' });
    }
};

export const removeServiceProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSp = await ServiceProvider.findByIdAndDelete(id);

        if (!deletedSp) {
            return res.status(404).json({ success: false, message: 'service provider not found' });
        }

        res.status(201).json({ success: true, message: 'Service provider deleted succesfully' });
        console.log('Service provider deleted succesfully');
    }
    catch (error) {
        console.error('Error in deleting a Service provider:', error);
        res.status(500).send("Something went wrong");
    }
};

export const replaceServiceProvider = async (req, res) => {
    const { id } = req.params;
    const serviceProv = req.body;

    console.log('process of replacing');

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid service provider id' });
    }

    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(id, serviceProv, { new: true });
        res.status(201).json({ success: true, data: updatedServiceProvider, message: 'Service provider updated succesfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}