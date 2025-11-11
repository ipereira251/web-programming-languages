import { create } from 'zustand';

const useStore = create((set) => ({
  isAdvancedFeaturesEnabled: false, 
  toggleAdvancedFeatures: () => set((state) => ({ isAdvancedFeaturesEnabled: !state.isAdvancedFeaturesEnabled })),
}));

export default useStore;
