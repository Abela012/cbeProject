import { model, Schema } from "mongoose";

const ScheduleListSchema = Schema(
  {
    title: { type: String },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    startTime: { type: Date },
    endTime: { type: Date },
    date: { type: Date },
  },
  { timestamps: true }
);

const ScheduleList = model("ScheduleList", ScheduleListSchema);
export default ScheduleList;
