import { create } from "zustand";

const useMenuStore = create((set, get) => ({
  menu: [],
  subMenu: [],
  isMenuOpen: false,
  isSubMenuOpen: false,
  setMenu: (menu) => set({ menu }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  openSubMenu: (subOption) => {
    const isSame = get().subMenu?.id === subOption?.id;
    const isOpen = get().isSubMenuOpen;

    if (isSame && isOpen) {
      set({ isSubMenuOpen: false });
    } else if (!isSame && isOpen) {
      set({ isSubMenuOpen: false });
      setTimeout(() => {
        set({ subMenu: subOption, isSubMenuOpen: true });
      }, 300);
    } else if (!isSame && !isOpen) {
      set({ subMenu: subOption, isSubMenuOpen: true });
    } else {
      set({ isSubMenuOpen: true });
    }
  },
  closeSubMenu: () => set({ isSubMenuOpen: false }),
}));

export default useMenuStore;
