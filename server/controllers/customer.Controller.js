import { unlink } from "fs";
import Appointment from "../models/appointment.model.js";
import Customer from "../models/customer.model.js";
import {
  encryptAndStoreFile,
  retrieveAndDecryptFile,
} from "../util/cipherFile.js";

const getCustomer = async (req, res) => {
  try {
    if (req.query.q != "" && req.query.q !== undefined) {
      let query = req.query.q;
      const customers = await Customer.find({
        $or: [
          { phoneNumber: { $regex: new RegExp(query, "i") } },
          { customerEmail: { $regex: new RegExp(query, "i") } },
        ],
      });

      return res.json(customers);
    }
    // const customers = await Customer.find({});
    return res.json([]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const registreCustomer = async (req, res) => {
  try {
    let {
      firstName,
      middleName,
      lastName,
      businessName,
      customerEmail,
      phoneNumber,
      address,
    } = req.body;

    let fullName = firstName + " " + middleName + " " + lastName;

    if (!req.file) {
      const newCustomer = await Customer.create({
        firstName,
        middleName,
        lastName,
        fullName,
        businessName,
        customerEmail,
        phoneNumber,
        address,
      });
      return res.status(201).json("Customer registerd successfully");
    }
    const { content, key, iv } = await encryptAndStoreFile(req.file.path);
    const newCustomer = await Customer.create({
      firstName,
      middleName,
      lastName,
      fullName,
      businessName,
      customerEmail,
      phoneNumber,
      address,
      customerFile: { fileName: req.file.filename, file: content, key, iv },
    });

    return res.status(201).json("Customer registerd successfully");
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
      { customerId: 1, _id: 0 }
    ).populate({ path: "customerId", select: "customerFile" });
    const { customerId } = foundAppointmentFile;
    const result = await retrieveAndDecryptFile(customerId.customerFile);
    setTimeout(() => {
      unlink("./temp/" + customerId.customerFile.fileName, (err) => {
        if (err) throw err;
        console.log(customerId.customerFile.fileName + " was deleted");
      });
    }, 60 * 60 * 1000);
    // console.log(foundAppointmentFile);

    return res.json(foundAppointmentFile);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export { registreCustomer, getCustomer, getAppointmentByIdForFileView };
