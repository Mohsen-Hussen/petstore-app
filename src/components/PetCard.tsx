import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	Button,
	Chip,
} from "@mui/material";
import type { Pet } from "../types/pets";
import { useState } from "react";

const PetCard = ({ pet }: { pet: Pet }) => {
	const placeholder = "https://placehold.co/600x400?text=Pet";
	const [img, setImg] = useState<string>(pet.photoUrls?.[0] || placeholder);
	return (
		<Card>
			<CardMedia
				component="img"
				height="160"
				image={img}
				alt={pet.name}
				onError={() => setImg(placeholder)}
			/>
			<CardContent>
				<Typography variant="h6">{pet.name}</Typography>
				{pet.status && <Chip label={pet.status} size="small" />}
			</CardContent>
			<CardActions>
				<Button
					component={Link}
					to={`/pets/${pet.id}`}
					size="small"
					variant="contained"
					color="primary"
				>
					Details
				</Button>
				<Button
					component={Link}
					to={`/pets/${pet.id}/edit`}
					size="small"
					variant="contained"
					color="secondary"
				>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
};

export default PetCard;
