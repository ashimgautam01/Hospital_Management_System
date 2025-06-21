
import Doctor from '../models/doctor.js'

const generateDoctorId = async () => {
    const lastDoctor = await Doctor.findOne({})
        .sort({ createdAt: -1 })
        .select("doctorid");

    if (!lastDoctor || !lastDoctor.doctorid) {
        return "CTY1001";
    }

    const lastId = lastDoctor.doctorid;
    const numberPart = parseInt(lastId.replace("CTY", ""), 10) || 1000;
    return `CTY${numberPart + 1}`;
};

export default generateDoctorId;