import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
}) => (
  <Dialog open={open} onClose={onClose}>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);

export default Modal;
