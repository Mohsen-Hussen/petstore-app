import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const PetCard = ({ pet }: { pet: Pet }) => {
	const placeholder = "https://placehold.co/600x400?text=Pet";
	const [img, setImg] = useState<string>(pet.photoUrls?.[0] || placeholder);

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.3 }
		},
		hover: { 
			y: -5,
			transition: { duration: 0.2 }
		}
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			whileHover="hover"
		>
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
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button
							component={Link}
							to={`/pets/${pet.id}`}
							size="small"
							variant="contained"
							color="primary"
						>
							Details
						</Button>
					</motion.div>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button
							component={Link}
							to={`/pets/${pet.id}/edit`}
							size="small"
							variant="contained"
							color="secondary"
						>
							Edit
						</Button>
					</motion.div>
				</CardActions>
			</Card>
		</motion.div>
	);
};

export default PetCard;
