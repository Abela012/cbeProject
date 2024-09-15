import Appointment from "../models/appointment.model.js";
import ScheduleList from "../models/scheduleList.model.js";

const createSchedule = async (req, res) => {
  try {
    const { start, end, title, officeId, appointmentId } = req.body;
    const appointment = await Appointment.updateOne(
      { _id: appointmentId },
      {
        startTime: start,
        endTime: end,
      }
    );
    const newSchedule = await ScheduleList.create({
      startTime: start,
      endTime: end,
      title: title,
      officeId: officeId,
      appointmentId: appointmentId,
    });

    return res.status(200).json("Appointment scheduled");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};
const getScheduleList = async (req, res) => {
  try {
    const { officeId } = req.params;
    const foundSchedule = await ScheduleList.find({ officeId });
    const payload = foundSchedule.map(
      ({ appointmentId, officeId, title, startTime, endTime, _id }) => ({
        id: _id,
        appointmentId,
        officeId,
        title,
        start: startTime,
        end: endTime,
      })
    );

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSchedule = await ScheduleList.findOne({ _id: id });
    const payload = {
      id: foundSchedule._id,
      title: foundSchedule.title,
      start: foundSchedule.startTime,
      end: foundSchedule.endTime,
    };

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { start, end, title } = req.body;
    const updateSchedule = await ScheduleList.updateOne(
      { _id: scheduleId },
      { title, startTime: start, endTime: end }
    );
    return res.json("Schedule updated");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await ScheduleList.deleteOne({ _id: id });
    return res.json("Schedule deleted");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export {
  createSchedule,
  getScheduleList,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
