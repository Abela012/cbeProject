import Appointment from "../models/appointment.model.js";
import Customer from "../models/customer.model.js";

const createAppointment = async (req, res) => {
  try {
    // console.log(req.body);
    const { staffId, customerId, officeId, file } = req.body;

    const newAppointment = await Appointment.create({
      staffId,
      customerId,
      officeId,
      appointmentFile: { fileName: req.file.originalname, file: req.file.path },
    });
    return res.status(201).json("Appointment created successfully");
  } catch (error) {
    console.log(error);
  }
};

const getAppointments = async (req, res) => {
  try {
    const { officeId } = req.params;

    if (req.query.q != "null" && req.query.q !== undefined) {
      let query = req.query.q;
      const appointments = await Appointment.find({ officeId }).populate({
        path: "customerId officeId",
        // select: "customerName email phone",
      });
      // console.log(appointments);

      const filterdAppointments = appointments.filter((appointment) => {
        return appointment.customerId?.fullName
          .toLowerCase()
          .includes(query.toLowerCase());
      });

      return res.json(filterdAppointments);
    }
    const appointments = await Appointment.find({ officeId }).populate({
      path: "customerId officeId",
      // select: "customerName email phone",
    });
    // console.log(appointments);
    return res.json(appointments);
  } catch (error) {
    console.log(error);
    return res.status(500).json("server error");
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointement = await Appointment.findOne({ _id: id }).populate(
      "customerId"
    );
    res.json(appointement);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      businessName,
      customerEmail,
      phoneNumber,
      officeId,
      startTime,
      endTime,
      category,
    } = req.body;

    const updatedappointment = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        officeId,
        startTime,
        endTime,
        category: category,
      }
    );
    const [firstName, middleName, lastName] = fullName?.split(" ");
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: updatedappointment.customerId },
      {
        firstName,
        middleName,
        lastName,
        fullName: fullName,
        businessName: businessName,
        customerEmail: customerEmail,
        phoneNumber: phoneNumber,
      }
    );
    return res.json("Appointment updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedappointment = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        status,
      }
    );
    return res.json("Appointment updated");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({ _id: id });
    // console.log(appointment);
    return res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};

export {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
