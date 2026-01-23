import { create } from "zustand";

interface ProfileState {
  profileImage: string | null;
  setProfileImage: (uri: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileImage: null,
  setProfileImage: (uri) => set({ profileImage: uri }),
}));
