import { unlink } from "fs";
import Appointment from "../models/appointment.model.js";
import Customer from "../models/customer.model.js";
import ScheduleList from "../models/scheduleList.model.js";
import {
  encryptAndStoreFile,
  retrieveAndDecryptFile,
} from "../util/cipherFile.js";

const createAppointment = async (req, res) => {
  try {
    // console.log(req.body, req.file);
    const { staffId, customerId, officeId } = req.body;
    if (!req.file) {
      const newAppointment = await Appointment.create({
        staffId,
        customerId,
        officeId,
      });
      return res.status(201).json("Appointment created successfully");
    }
    const { content, key, iv } = await encryptAndStoreFile(req.file.path);

    const newAppointment = await Appointment.create({
      staffId,
      customerId,
      officeId,
      appointmentFile: {
        fileName: req.file.filename,
        file: content,
        key,
        iv,
      },
    });

    return res.status(201).json("Appointment created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
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
    const appointement = await Appointment.findOne(
      { _id: id },
      {
        startTime: 1,
        endTime: 1,
        "appointmentFile.fileName": 1,
      }
    ).populate({
      path: "customerId",
      select:
        "fullName phoneNumber customerEmail businessName address customerFile.fileName ",
    });
    return res.json(appointement);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getAppointmentByIdForFileView = async (req, res) => {
  try {
    const { id } = req.params;
    const foundAppointmentFile = await Appointment.findOne(
      {
        _id: id,
      },
      { appointmentFile: 1, _id: 0 }
    );
    const { appointmentFile } = foundAppointmentFile;
    const result = await retrieveAndDecryptFile(appointmentFile);
    // console.log(appointmentFile);
    setTimeout(() => {
      unlink("./temp/" + appointmentFile.fileName, (err) => {
        if (err) throw err;
        console.log(appointmentFile.fileName + " was deleted");
      });
    }, 60 * 60 * 1000);
    return res.json(foundAppointmentFile);
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
    const shcedule = await ScheduleList.findOneAndDelete({ appointmentId: id });
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
  getAppointmentByIdForFileView,
  deleteAppointment,
};
