import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { addNewFolder } from "../utils/folderUtils";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const popupName = searchParams.get("popup");

  const handleOpenPopup = () => {
    setOpen(true);
    setSearchParams({ popup: "add-folder" });
  };

  const handleClose = () => {
    setOpen(false);
    setNewFolderName("");
    navigate(-1);
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });

    handleClose();
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NewFolder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}