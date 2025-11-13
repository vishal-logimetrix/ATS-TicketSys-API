

import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
    device_type: {
        type: String,
        required: true
    },
    serial_no: {
        type: String,
        required: true
    },
    server_count: {
        type: String,
        required: true
    },
    organization_name: {
        type: String,
        required: true
    },
    communication_address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}, {timestamps: true})


const DeviceModel = model("device", deviceSchema);
export default DeviceModel;