import React from "react";
import { Racun } from "../types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const HistoryRacuniRoute = () => {
  const [racuni, setRacuni] = React.useState<Racun[] | null>(
    JSON.parse(localStorage.getItem("racuni") || "[]")
  );

  const { state }: { state: any } = useLocation();

  let navigate = useNavigate();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>EOR</TableCell>
          <TableCell>ZOI</TableCell>
          <TableCell>Datum</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {racuni?.map((racun) => (
          <TableRow>
            <TableCell>{racun.f}</TableCell>
            <TableCell>{racun.g}</TableCell>
            <TableCell>{racun.d.toString()}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  navigate("/validated-racun", { state: { racun: racun } })
                }
              >
                IZBERI
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
