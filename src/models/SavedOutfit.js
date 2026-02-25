// models/SavedOutfit.js
import mongoose from "mongoose";

const savedOutfitSchema = new mongoose.Schema(
  {
    user:             { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name:             { type: String, default: "My Outfit" },
    outfitImage:      { type: String, default: "" },  // base64 JPEG screenshot
    clothingType:     { type: String, default: "" },
    color:            { type: String, default: "#ffffff" },
    occasion:         { type: String, default: "" },
    avatarGender:     { type: String, default: "" },
    avatarSize:       { type: String, default: "" },
    skinHex:          { type: String, default: "" },
    clothedAvatarUrl: { type: String, default: "" },
    textureUri:       { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("SavedOutfit", savedOutfitSchema);