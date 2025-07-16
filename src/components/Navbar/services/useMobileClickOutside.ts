import { useEffect, useState } from "react";

const useMobileClickOutside = (
  ref: React.RefObject<HTMLElement>
): [boolean, (value: boolean) => void] => {
  const [isOpenNavbarModal, setIsOpenNavbarModal] = useState<boolean>(false);

  useEffect(() => {
    //todo: handle click out to close modal
    const clickOutToClose = (e: MouseEvent): void => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpenNavbarModal(false);
      }
    };
    document.addEventListener("mousedown", (e) => clickOutToClose(e));
    return () => {
      document.removeEventListener("mousedown", (e) => clickOutToClose(e));
    };
  }, []);

  return [isOpenNavbarModal, setIsOpenNavbarModal];
};

export default useMobileClickOutside;
