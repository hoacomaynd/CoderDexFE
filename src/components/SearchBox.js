import { SearchOutlined } from "@mui/icons-material";
import { Stack, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  changePage,
  getPokemons,
  searchQuery,
} from "../features/pokemons/pokemonSlice";
import { FormProvider, FTextField } from "./form";

const styles = {
  container: {
    // padding: '0!important',
    color: "white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  inputText: {
    backgroundColor: "white",
    borderRadius: 1,
    color: "white",
    width: "85%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "3px solid blue",
      borderRadius: 1,
    },
    "& .MuiOutlinedInput-input": {
      border: "3px solid gray",
      padding: "0.5rem",
      borderRadius: 1,
    },
  },
  icon: {
    backgroundColor: "#ee6b2f",
    height: "2.5rem",
    width: "2.5rem",
    padding: 0.1,
    borderRadius: 1,
  },
  boxRight: {
    padding: 2,
    backgroundColor: "green",
    borderRadius: 2,
    width: { xs: "90%", md: "100%" },
  },
};

const defaultValues = {
  search: "",
};

export const SearchBox = () => {
  const methods = useForm(defaultValues);
  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    let { search } = data;
    
    search = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
    dispatch(searchQuery(search));
    dispatch(changePage(1));
    dispatch(getPokemons({ page: 1, search, type: search })); 
    reset({ search: "" });
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid
        container
        maxWidth="md"
        sx={{ paddingY: "2rem" }}
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        <Grid item xs={12} sm={12} md={6} sx={styles.center}>
          <Stack sx={{ width: { xs: "90%", md: "100%" } }}>
            <Typography variant="h5">Name or Number</Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FTextField name="search" sx={styles.inputText} />
                <SearchOutlined sx={styles.icon} />
              </Stack>
            </FormProvider>
            <Typography>
              Use the Advanced Search to explore Pokémon by type, weakness,
              Ability, and more!
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} sx={styles.center}>
          <Box sx={styles.boxRight}>
            <Typography variant="h6">
              Search for a Pokémon by name or using its National Pokédex number.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};