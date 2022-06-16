import { miO } from "../models/miO.js";

export const getmiOs = async (req, res) => {
  try {
    const mios = await miO.findAll();
    res.json(mios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createmiO = async (req, res) => {
  try {
    const { Quantity, Amount } = req.body;
    const newmiO = await miO.create({
        Quantity,
        Amount
    });
    res.json(newmiO);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getmiO = async (req, res) => {
  const { OrderId } = req.params;
  try {
    const mio = await miO.findOne({
      where: { OrderId },
    });
    res.json(mio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatemiO = async (req, res) => {
  try {
    const { OrderId } = req.params;

    const mio = await miO.findOne({
      where: { OrderId },
    });
    mio.set(req.body);
    await mio.save();
    return res.json(mio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletemiO = async (req, res) => {
  const { OrderId } = req.params;
  try {
    const result = await miO.destroy({
      where: { OrderId },
    });
    console.log(result);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
