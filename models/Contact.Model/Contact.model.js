const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);
module.exports = Contact;
