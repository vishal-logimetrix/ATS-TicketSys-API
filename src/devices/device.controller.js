import DeviceModel from "./device.model.js";



export const getDevices = async (req, res)=>{
    try {
        const data = await DeviceModel.find({}, "_id serial_no");
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message || "server error" });
    }
}


export const getDeviceDetails = async (req, res)=>{
    try {
        // const { id } = req.params;
        const { serial_no } = req.params;
        const device = await DeviceModel.find({serial_no})
        // const device = await DeviceModel.findById(id)
        res.json(device);
    } catch (err) {
        res.status(500).json({ message: err.message || "server error" });
    }
}