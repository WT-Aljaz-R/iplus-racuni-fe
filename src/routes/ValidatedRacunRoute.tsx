import { Stack, Typography, Divider, Box } from "@mui/material";
import { Racun } from "../types";
import Grid from "@mui/material/Grid2";
import { useLocation } from "react-router-dom";

export const ValidatedRacunRoute = () => {
  const { state }: { state: any } = useLocation();

  const racun: Racun = state.racun;

  const sumOfRacun = (racun: Racun) => {
    let sum = 0;

    for (const postavka of racun.z) {
      sum += postavka.b * postavka.c;
    }

    return sum;
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          NAZIV PODJETJA: {racun.a.split("#")[0]}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          NASLOV PODJETJA: {racun.a.split("#")[1]}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          POŠTA PODJETJA: {racun.a.split("#")[2]}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ID ZA DDV: {racun.a.split("#")[3]}
        </Typography>
        <Typography variant="body2">Številka računa: {racun.c}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Postavke računa
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={1} sx={{ paddingBottom: 1 }}>
        <Grid size={{ xs: 6 }}>
          <Typography variant="body2" fontWeight="bold" align="left">
            Artikel
          </Typography>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Typography variant="body2" fontWeight="bold" align="left">
            Količina
          </Typography>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Typography variant="body2" fontWeight="bold" align="left">
            Vrednost
          </Typography>
        </Grid>
      </Grid>

      {racun.z.map((postavka, index) => (
        <Grid container key={index} spacing={1}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" align="left">
              {postavka.a}
            </Typography>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Typography variant="body2" align="left">
              {postavka.b}
            </Typography>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Typography variant="body2" align="left">
              {postavka.c}
            </Typography>
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">Skupaj za plačilo:</Typography>
        <Typography variant="body2" align="left">
          {sumOfRacun(racun)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Podatki o davku
      </Typography>
      <Stack spacing={1}>
        <Typography variant="body2">Davčna stopnja: {racun.e}</Typography>
        <Typography variant="body2">
          Neto vrednost: {sumOfRacun(racun)}
        </Typography>
        <Typography variant="body2">
          DDV: {sumOfRacun(racun) * racun.e}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Bruto vrednost: {sumOfRacun(racun) * racun.e + sumOfRacun(racun)}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Prodajalec
      </Typography>
      <Typography variant="body2">Ime: {racun.b}</Typography>
      <Typography variant="body2">
        Čas izdaje: {new Date(racun.d).toLocaleString()}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body2">ZOI: {racun.f}</Typography>
      <Typography variant="body2">EOR: {racun.g}</Typography>
    </Box>
  );
};
