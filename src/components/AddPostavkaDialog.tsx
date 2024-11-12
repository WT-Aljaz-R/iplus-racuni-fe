import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { Postavka } from "../types";

interface AddPostavkaDialogProps {
  onAddPostavka: (newPostavka: Postavka) => void;
}

export const AddPostavkaDialog: React.FC<AddPostavkaDialogProps> = ({
  onAddPostavka,
}) => {
  const [open, setOpen] = React.useState(false);
  const [artikel, setArtikel] = React.useState("");
  const [kolicina, setKolicina] = React.useState<number>(0);
  const [vrednost, setVrednost] = React.useState<number>(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (artikel && kolicina && vrednost) {
      const newPostavka: Postavka = { a: artikel, b: kolicina, c: vrednost };
      onAddPostavka(newPostavka);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Dodaj postavko
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj postavko</DialogTitle>
        <DialogContent>
          <TextField
            label="Artikel"
            variant="outlined"
            size="small"
            fullWidth
            value={artikel}
            onChange={(e) => setArtikel(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Količina"
            variant="outlined"
            size="small"
            fullWidth
            value={kolicina}
            onChange={(e) => setKolicina(Number(e.target.value))}
            margin="dense"
            type="number"
          />
          <TextField
            label="Vrednost"
            variant="outlined"
            size="small"
            fullWidth
            value={vrednost}
            onChange={(e) => setVrednost(Number(e.target.value))}
            margin="dense"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
