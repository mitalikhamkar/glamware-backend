import Feedback from "../models/Feedback.js";

export const sendFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      message
    });

    res.status(201).json({
      message: "Feedback sent successfully",
      feedback
    });

  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};