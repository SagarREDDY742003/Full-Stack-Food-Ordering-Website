import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  location: String,
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Restaurant",
  },
  startedAt: String,
  endsAt: String,
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
