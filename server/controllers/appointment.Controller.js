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

const getAppointmentStati = async (req, res) => {
  try {
    const result = await Appointment.aggregate([
      {
        $match: { isDeleted: false }, // Optional: Filter out deleted appointments
      },
      {
        $group: {
          _id: "$status", // Group by the status field
          count: { $sum: 1 }, // Count each appointment in the group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          status: "$_id", // Rename _id to status
          count: 1, // Keep the count
        },
      },
      {
        $group: {
          _id: null, // Group all results into a single document
          counts: { $push: { status: "$status", count: "$count" } }, // Push status and count into an array
          total: { $sum: "$count" }, // Calculate the total count
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          counts: 1, // Include the counts array
          total: 1, // Include the total count
        },
      },
    ]);

    // If there are no appointments, return zero counts
    if (result.length === 0) {
      return res.json({
        counts: [
          { status: "Pending", count: 0 },
          { status: "Canceled", count: 0 },
          { status: "Completed", count: 0 },
        ],
        total: 0,
      });
    }

    // Format the result to include all statuses even if count is 0
    const counts = result[0].counts;
    const statuses = ["Pending", "Canceled", "Completed"];
    const formattedCounts = statuses.map((status) => {
      const found = counts.find((item) => item.status === status);
      return {
        status,
        count: found ? found.count : 0,
      };
    });

    return res.json({
      counts: formattedCounts,
      total: result[0].total, // Total count of all appointments
    });
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const getAppointments = async (req, res) => {
  try {
    const { officeId } = req.params;

    if (req.query.q != "null" && req.query.q !== undefined) {
      let query = req.query.q;
      const appointments = await Appointment.find(
        {
          officeId,
          isDeleted: false,
        },
        { appointmentFile: 0 }
      ).populate({
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
    const appointments = await Appointment.find(
      {
        officeId,
        isDeleted: false,
      },
      { appointmentFile: 0 }
    ).populate({
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
      { _id: id, isDeleted: false },
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

const updateAppointmentPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const updatedappointment = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        priority,
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
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    const shcedule = await ScheduleList.findOneAndUpdate(
      { appointmentId: id },
      { isDeleted: true }
    );
    // console.log(appointment);
    return res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};

export {
  createAppointment,
  getAppointmentStati,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  updateAppointmentPriority,
  getAppointmentByIdForFileView,
  deleteAppointment,
};
