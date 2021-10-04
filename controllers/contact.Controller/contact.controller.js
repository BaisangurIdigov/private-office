const Contact = require("../../models/Contact.Model/Contact.model")

module.exports.contactController = {
  getContacts: async (req,res)=> {
    const contact = await Contact.findById({
      user: req.user.id
    }).populate("user")
    res.json(contact)
  },
  createContact: async (req, res) => {
    const { name, number, email } = req.body;

    try {
      const contact = await Contact.create({
        user: req.user.id,
        name,
        number,
        email
      });
      return res.json(contact);
    } catch (e) {
      return res.status(401).json("неверны тип токена");
    }
  },
}