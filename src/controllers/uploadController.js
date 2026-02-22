//uploadController
export const uploadCloth = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "Cloth uploaded successfully",
      filePath: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload error", error });
  }
};
