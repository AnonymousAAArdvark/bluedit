import { useEffect } from "react";

const useOutSideAlerter = (ref: any, setVisible: any, ref2: any=null) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(ref2 !== null && ref2.current && ref2.current.contains(event.target)) {
        return;
      }
      if(ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ref2, setVisible]);
}

export default useOutSideAlerter;