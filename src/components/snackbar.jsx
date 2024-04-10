import React, {useEffect, useState, useRef} from "react";
import "./css/snackbar.css";
import { X } from "lucide-react";

export const Snackbar=({ show, content, color })=> {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Snackbar called");
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
        clearTimeout(timer);
    };
  }, []);

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <div
      className={`snackbar-label ${visible ? "show" : "hide"}`}
      style={{
        top: visible ? "20px" : "-100px",
        backgroundColor: color,
      }}
    >
      <p>{content}</p>
      <X size={20} onClick={hideSnackbar}/>
    </div>
  );
}

// useSnackbar hook
const useSnackbar = (initialMessage = '', initialColor = 'red') => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(initialMessage);
  const [snackbarColor, setSnackbarColor] = useState(initialColor);
  const timeoutRef = useRef(null);

  const displaySnackbar = (message, color) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setSnackbarContent(message);
      setSnackbarColor(color);

      timeoutRef.current = setTimeout(() => setShowSnackbar(false), 3000);

      setShowSnackbar(true);
  };

  return [showSnackbar, snackbarContent, snackbarColor, displaySnackbar];
};

export default Snackbar;
export { useSnackbar };