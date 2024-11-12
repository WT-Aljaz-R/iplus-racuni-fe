import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Racun, Postavka } from "../types";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AddPostavkaDialog } from "../components/AddPostavkaDialog";

export const EditRacunRoute = () => {
  const [racun, setRacun] = React.useState<Racun | null>();

  const NALOGA_URL = process.env.REACT_APP_NALOGA_URL as string;

  const { state }: { state: any } = useLocation();

  let navigate = useNavigate();

  const handleInputChange = (field: keyof Racun, value: any) => {
    setRacun((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof Postavka,
    value: any
  ) => {
    setRacun((prev) => {
      if (!prev) return null;
      const updatedZ = prev.z.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "b" || field === "c" ? parseFloat(value) : value,
            }
          : item
      );
      return { ...prev, z: updatedZ };
    });
  };

  const handleAddPostavka = (newPostavka: Postavka) => {
    setRacun((prev) => {
      if (!prev) return null;
      return { ...prev, z: [...prev.z, newPostavka] };
    });
  };

  const handleDeletePostavka = (index: number) => {
    setRacun((prev) => {
      if (!prev) return null;
      const updatedZ = prev.z.filter((_, i) => i !== index);
      return { ...prev, z: updatedZ };
    });
  };

  const getRacun = async () => {
    try {
      const response = await axios.get(
        NALOGA_URL
      );
      setRacun(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateRacun = async () => {
    try {
      if (racun) {
        racun.h = 5;
        const response = await axios.post(
          NALOGA_URL,
          { racun }
        );

        const savedRacuni = JSON.parse(localStorage.getItem("racuni") || "[]");
        savedRacuni.push(racun);
        localStorage.setItem("racuni", JSON.stringify(savedRacuni));

        navigate("/validated-racun", { state: { racun: racun } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRacun();
  }, []);

  if (!racun) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={4}
        border={2}
        borderRadius={2}
        bgcolor={"white"}
        sx={{ margin: "0 auto" }}
      >
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ flexBasis: "30%" }}>
            <Box padding={2} borderRadius={2}>
              <Stack spacing={3}>
                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">Podjete</Typography>
                  <Stack spacing={1} marginTop={1}>
                    {racun.a.split("#").map((value, index) => (
                      <TextField
                        key={index}
                        value={value}
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          const updatedA = racun.a.split("#");
                          updatedA[index] = e.target.value;
                          handleInputChange("a", updatedA.join("#"));
                        }}
                        fullWidth
                      />
                    ))}
                  </Stack>
                </Box>

                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">Številka računa</Typography>
                  <TextField
                    value={racun.c}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInputChange("c", e.target.value)}
                    fullWidth
                  />
                </Box>

                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">Ime prodajalca</Typography>
                  <TextField
                    value={racun.b}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInputChange("b", e.target.value)}
                    fullWidth
                  />
                </Box>

                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">Čas izdaje računa</Typography>
                  <TextField
                    value={racun.d}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInputChange("d", e.target.value)}
                    fullWidth
                  />
                </Box>

                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">ZOI</Typography>
                  <TextField
                    value={racun.f}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInputChange("g", e.target.value)}
                    fullWidth
                  />
                </Box>

                <Box padding={2} border={1} borderRadius={2}>
                  <Typography variant="h6">EOR</Typography>
                  <TextField
                    value={racun.g}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInputChange("h", e.target.value)}
                    fullWidth
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} sx={{ flexBasis: "70%" }}>
            <Box padding={2} borderRadius={2}>
              <Box padding={2} border={1} borderRadius={2}>
                <Typography variant="h6">Postavke računa</Typography>
                <Stack spacing={1} marginTop={1}>
                  {racun.z.map((postavka, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      padding={1}
                      border={1}
                      borderRadius={2}
                    >
                      <TextField
                        value={postavka.a}
                        label="Artikel"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                          handleItemChange(index, "a", e.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        value={postavka.b}
                        label="Količina"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                          handleItemChange(index, "b", e.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        value={postavka.c}
                        label="Vrednost"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                          handleItemChange(index, "c", e.target.value)
                        }
                        fullWidth
                      />
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => handleDeletePostavka(index)}
                      >
                        Odstrani
                      </Button>
                    </Box>
                  ))}
                  <AddPostavkaDialog onAddPostavka={handleAddPostavka} />
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="flex-end"
        paddingTop={2}
      >
        <Button variant="contained" color="primary" onClick={validateRacun}>
          Potrdi račun
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/history")}
        >
          Zgodovina računov
        </Button>
      </Grid>
    </div>
  );
};
