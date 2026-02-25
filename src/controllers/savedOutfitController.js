// controllers/savedOutfitController.js
import SavedOutfit from "../models/SavedOutfit.js";

export const createSavedOutfit = async (req, res) => {
  try {
    const { name, outfitImage, clothingType, color, occasion,
            avatarGender, avatarSize, skinHex, clothedAvatarUrl, textureUri } = req.body;
    const outfit = await SavedOutfit.create({
      user: req.user.id, name: name||"My Outfit", outfitImage: outfitImage||"",
      clothingType: clothingType||"", color: color||"#ffffff", occasion: occasion||"",
      avatarGender: avatarGender||"", avatarSize: avatarSize||"",
      skinHex: skinHex||"", clothedAvatarUrl: clothedAvatarUrl||"", textureUri: textureUri||"",
    });
    return res.status(201).json({ ...outfit.toObject(), id: outfit._id.toString() });
  } catch (e) { console.error("createSavedOutfit:", e); return res.status(500).json({ message: e.message }); }
};

export const getMySavedOutfits = async (req, res) => {
  try {
    const outfits = await SavedOutfit.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
    return res.json(outfits.map(o => ({ ...o, id: o._id.toString(), dateCreated: o.createdAt })));
  } catch (e) { return res.status(500).json({ message: e.message }); }
};

export const renameSavedOutfit = async (req, res) => {
  try {
    const outfit = await SavedOutfit.findById(req.params.id);
    if (!outfit) return res.status(404).json({ message: "Not found" });
    if (outfit.user.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    outfit.name = req.body.name || outfit.name;
    await outfit.save();
    return res.json({ ...outfit.toObject(), id: outfit._id.toString() });
  } catch (e) { return res.status(500).json({ message: e.message }); }
};

export const deleteSavedOutfit = async (req, res) => {
  try {
    const outfit = await SavedOutfit.findById(req.params.id);
    if (!outfit) return res.status(404).json({ message: "Not found" });
    if (outfit.user.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await outfit.deleteOne();
    return res.json({ message: "Deleted" });
  } catch (e) { return res.status(500).json({ message: e.message }); }
};