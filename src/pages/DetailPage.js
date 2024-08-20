import {
	Box,
	Button,
	CardMedia,
	Container,
	Grid,
	Stack,
	Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useParams } from "react-router-dom";
  import { PokeType } from "../components/PokeType";
  import { getPokemonById } from "../features/pokemons/pokemonSlice";
  import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
  import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import { BASE_URL } from "../app/config";
  import PokemonEdit from "../components/PokemonEdit";
  import PokemonDelete from "../components/PokemonDelete";
  
  const styles = {
	container: {
	  backgroundColor: "white",
	  backgroundImage: "url('/images/container_bg.png')",
	  pb: 5,
	},
  };
  
  export const DetailPage = () => {
	const { currentPokemon, nextPokemon, previousPokemon } = useSelector(
	  (state) => state.pokemons.pokemon
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const weaknesses = calculateWeaknesses(currentPokemon?.types);
	const [openPostEdit, setOpenPostEdit] = useState(false);
	const [openPokemonDelete, setOpenPokemonDelete] = useState(false);
  
	const formattedAbilities = () => {
	  let abilities = "";
	  currentPokemon?.abilities?.map((ability) => (abilities += ability + ", "));
	  return abilities ? abilities.slice(0, abilities.length - 2) : "Unknown";
	};
  
	const handleOpenPostEdit = () => {
	  setOpenPostEdit(true);
	};
  
	const handleOpenPokemonDelete = () => {
	  setOpenPokemonDelete(true);
	};
  
	const handleClosePostEdit = () => {
	  setOpenPostEdit(false);
	};
  
	const handleClosePokemonDelete = () => {
	  setOpenPokemonDelete(false);
	};
  
	useEffect(() => {
	  dispatch(getPokemonById(id));
	}, [id, dispatch]);
  
	return (
	  <Container maxWidth="lg" disableGutters sx={styles.container}>
		<Box position="relative">
		  <Grid container spacing={1}>
			<Grid item xs={6}>
			  <Box
				pt={2}
				pb={8}
				pl={3}
				className="navigation-button"
				display="flex"
				alignItems="center"
				sx={{ textDecoration: "none" }}
				component={Link}
				to={`/pokemons/${previousPokemon?.id || "1"}`}
			  >
				<ArrowBackIosNewIcon
				  sx={{
					color: "#616161",
					backgroundColor: "white",
					borderRadius: "50%",
					padding: "5px",
					mr: 2,
				  }}
				/>
				<Typography
				  variant="span"
				  color="white"
				  fontSize={24}
				  fontWeight={700}
				  marginRight={1}
				>
				  #{("000" + (previousPokemon?.id || "000")).slice(-3)}
				</Typography>
				<Typography
				  display={{ xs: "none", sm: "block" }}
				  color="#616161"
				  fontSize={24}
				  fontWeight={700}
				>
				  {previousPokemon?.name
					? previousPokemon?.name[0].toUpperCase() +
					  previousPokemon?.name.slice(1)
					: "Unknown"}
				</Typography>
			  </Box>
			</Grid>
  
			<Grid item xs={6}>
			  <Box
				pt={2}
				pb={8}
				pr={3}
				className="navigation-button"
				display="flex"
				alignItems="center"
				justifyContent="flex-end"
				sx={{ textDecoration: "none" }}
				component={Link}
				to={`/pokemons/${nextPokemon?.id || "1"}`}
			  >
				<Typography
				  display={{ xs: "none", sm: "block" }}
				  color="#616161"
				  fontSize={24}
				  fontWeight={700}
				  marginRight={1}
				>
				  {nextPokemon?.name
					? nextPokemon?.name[0].toUpperCase() +
					  nextPokemon?.name.slice(1)
					: "Unknown"}
				</Typography>
				<Typography color="white" fontSize={24} fontWeight={700}>
				  #{("000" + (nextPokemon?.id || "000")).slice(-3)}
				</Typography>
				<ArrowForwardIosIcon
				  sx={{
					color: "#616161",
					backgroundColor: "white",
					borderRadius: "50%",
					padding: "5px",
					ml: 2,
				  }}
				/>
			  </Box>
			</Grid>
		  </Grid>
  
		  <Box
			position="absolute"
			bottom={0}
			left="50%"
			sx={{ transform: "translateX(-50%)" }}
			textAlign="center"
			minWidth={"50%"}
			className="detail-name"
		  >
			<Box bgcolor="white" pt={2}>
			  <Typography sx={{ mr: 2 }} variant="h4" display="inline">
				{currentPokemon?.name
				  ? currentPokemon?.name[0].toUpperCase() +
					currentPokemon?.name.slice(1)
				  : "Unknown"}
			  </Typography>
			  <Typography variant="h4" display="inline" color="gray">
				#{("000" + (currentPokemon?.id || "000")).slice(-3)}
			  </Typography>
			</Box>
		  </Box>
		</Box>
		<Box
		  maxWidth="md"
		  sx={{
			margin: "auto!important",
			paddingX: "2rem",
			paddingY: "1rem",
			backgroundColor: "white",
			pt: 6,
		  }}
		>
		  <Grid container spacing={2}>
			<Grid item xs={12} md={6}>
			  <Box sx={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}>
				<CardMedia
				  component="img"
				  image={
					`${currentPokemon?.url}`.includes("http" || "https")
					  ? `${currentPokemon?.url}`
					  : `${BASE_URL}${currentPokemon?.url}`
				  }
				  alt={`${currentPokemon?.name}`}
				  sx={{
					margin: "auto",
					height: "260px",
					width: "auto",
					borderRadius: 5,
				  }}
				/>
			  </Box>
			  <Button
				fullWidth
				disableRipple
				onClick={handleOpenPostEdit}
				sx={{
				  padding: "6px",
				  marginTop: "10px",
				  backgroundColor: "#a4a4a4",
				  textTransform: "capitalize",
				  color: "#fff",
				  fontSize: "1.1rem",
				  borderRadius: "20px",
				  "&:hover": {
					backgroundColor: "#a4a4a4",
				  },
				}}
			  >
				Update Pokemon Info
			  </Button>
			  <PokemonEdit
				pokemon={currentPokemon}
				openPostEdit={openPostEdit}
				handleClosePostEdit={handleClosePostEdit}
			  />
			  <Button
				fullWidth
				disableRipple
				onClick={handleOpenPokemonDelete}
				sx={{
				  padding: "6px",
				  marginTop: "6px",
				  backgroundColor: "#e3350d",
				  textTransform: "capitalize",
				  color: "#fff",
				  fontSize: "1.1rem",
				  borderRadius: "20px",
				  "&:hover": {
					backgroundColor: "#e3350d",
				  },
				}}
			  >
				Delete Pokemon
			  </Button>
			  <PokemonDelete
				pokemon={currentPokemon}
				openPokemonDelete={openPokemonDelete}
				handleClosePokemonDelete={handleClosePokemonDelete}
			  />
			</Grid>
			<Grid item xs={12} md={6}>
			  <Stack spacing={2}>
				<Typography variant="p" sx={{ fontWeight: 550 }}>
				  Bio
				</Typography>
				<Typography variant="p">
				  {currentPokemon?.description ||
					"There is no info for this Pokemon. Consider expanding the Pokedex by adding more content."}
				</Typography>
  
				<Typography variant="p" sx={{ fontWeight: 550 }}>
				  Stats
				</Typography>
				<Box
				  sx={{
					backgroundColor: "#30a7d7",
					borderRadius: "10px",
					padding: 3,
				  }}
				>
				  <Grid container rowSpacing={1}>
					<Grid item xs={6}>
					  <Typography color="white">Height</Typography>
					  <div>{currentPokemon?.height || "Unknown"}</div>
					</Grid>
					<Grid item xs={6}>
					  <Typography color="white">Weight</Typography>
					  <div>{currentPokemon?.weight || "Unknown"}</div>
					</Grid>
					<Grid item xs={6}>
					  <Typography color="white">Category</Typography>
					  <div>{currentPokemon?.category || "Unknown"}</div>
					</Grid>
					<Grid item xs={6}>
					  <Typography color="white">Abilities</Typography>
					  <div>{formattedAbilities()}</div>
					</Grid>
				  </Grid>
				</Box>
  
				<Typography variant="p" sx={{ fontWeight: 550 }}>
				  Types
				</Typography>
				<Grid container spacing={1}>
				  {currentPokemon?.types.map((type) => (
					<Grid item key={type} xs={4}>
					  <PokeType type={type} size="large" color="white" />
					</Grid>
				  ))}
				</Grid>
				<Typography variant="p" sx={{ fontWeight: 550 }}>
				  Weaknesses
				</Typography>
				<Grid container spacing={1}>
				  {weaknesses.map((type) => (
					<Grid item key={type} xs={4}>
					  <PokeType type={type} size="large" color="white" />
					</Grid>
				  ))}
				</Grid>
			  </Stack>
			</Grid>
		  </Grid>
		</Box>
	  </Container>
	);
  };
  
  const weaknesses = {
	Normal: {
	  nullified: ["Ghost"],
	  resistant: [],
	  weak: ["Fighting"],
	},
	Fire: {
	  nullified: [],
	  resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
	  weak: ["Water", "Ground", "Rock"],
	},
	Water: {
	  nullified: [],
	  resistant: ["Fire", "Water", "Ice", "Steel"],
	  weak: ["Electric", "Grass"],
	},
	Electric: {
	  nullified: [],
	  resistant: ["Electric", "Flying", "Steel"],
	  weak: ["Ground"],
	},
	Grass: {
	  nullified: [],
	  resistant: ["Water", "Electric", "Grass", "Ground"],
	  weak: ["Fire", "Ice", "Poison", "Flying", "Bug"],
	},
	Ice: {
	  nullified: [],
	  resistant: ["Ice"],
	  weak: ["Fire", "Fighting", "Rock", "Steel"],
	},
	Fighting: {
	  nullified: [],
	  resistant: ["Bug", "Rock", "Dark"],
	  weak: ["Flying", "Psychic", "Fairy"],
	},
	Poison: {
	  nullified: [],
	  resistant: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
	  weak: ["ground", "psychic"],
	},
	Ground: {
	  nullified: ["Electric"],
	  resistant: ["Poison", "Rock"],
	  weak: ["Water", "Grass", "Ice"],
	},
	Flying: {
	  nullified: ["Ground"],
	  resistant: ["Grass", "Fighting", "Bug"],
	  weak: ["Electric", "Ice", "Rock"],
	},
	Psychic: {
	  nullified: [],
	  resistant: ["Fighting", "Psychic"],
	  weak: ["Bug", "Ghost", "Dark"],
	},
	Bug: {
	  nullified: [],
	  resistant: ["Grass", "Fighting", "Ground"],
	  weak: ["Fire", "Flying", "Rock"],
	},
	Rock: {
	  nullified: [],
	  resistant: ["Normal", "Fire", "Poison", "Flying"],
	  weak: ["Water", "Grass", "Fighting", "Ground", "Steel"],
	},
	Ghost: {
	  nullified: ["Normal", "Fighting"],
	  resistant: ["Poison", "Bug"],
	  weak: ["Ghost", "Dark"],
	},
	Dragon: {
	  nullified: [],
	  resistant: ["Fire", "Water", "Electric", "Grass"],
	  weak: ["Ice", "Dragon", "Fairy"],
	},
	Dark: {
	  nullified: ["Psychic"],
	  resistant: ["Ghost", "Dark"],
	  weak: ["Fighting", "Bug", "Fairy"],
	},
	Steel: {
	  nullified: ["Poison"],
	  resistant: [
		"Normal",
		"Grass",
		"Ice",
		"Flying",
		"Psychic",
		"Bug",
		"Rock",
		"Dragon",
		"Steel",
		"Fairy",
	  ],
	  weak: ["Fire", "Fighting", "Ground"],
	},
	Fairy: {
	  nullified: ["Dragon"],
	  resistant: ["Fighting", "Bug", "Dark"],
	  weak: ["Poison", "Steel"],
	},
  };
  
  const calculateWeaknesses = (types) => {
	if (!types) return [];
	let total = {
	  Normal: 0,
	  Fire: 0,
	  Water: 0,
	  Electric: 0,
	  Grass: 0,
	  Ice: 0,
	  Fighting: 0,
	  Poison: 0,
	  Ground: 0,
	  Flying: 0,
	  Psychic: 0,
	  Bug: 0,
	  Rock: 0,
	  Ghost: 0,
	  Dragon: 0,
	  Dark: 0,
	  Steel: 0,
	  Fairy: 0,
	};
  
	types.forEach((type) => {
	  weaknesses[type].weak.forEach((t) => total[t]++);
	  weaknesses[type].resistant.forEach((t) => total[t]--);
	  weaknesses[type].nullified.forEach((t) => total[t]--);
	});
	let final = [];
	Object.keys(total).forEach((type) => {
	  if (total[type] > 0) final.push(type);
	});
	return final;
  };
  