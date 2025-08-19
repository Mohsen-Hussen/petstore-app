import { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { usePet } from "../hooks/usePets";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import { Container, Typography, Chip, Stack, Button, Box } from "@mui/material";

const PetDetails = () => {
	const { id } = useParams();
	const { data, isLoading, error } = usePet(Number(id));
	const placeholder = "https://placehold.co/800x400?text=Pet";
	const [img, setImg] = useState<string>(data?.photoUrls?.[0] || placeholder);

	if (isLoading) return <Loading label="Loading pet..." />;
	if (error || !data) return <Box>Pet not found.</Box>;

	const pageVariants = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { 
			opacity: 1, 
			scale: 1,
			transition: { duration: 0.4 }
		},
		exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
	};

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<Container sx={{ py: 3 }}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<Typography variant="h4">{data.name}</Typography>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<Stack direction="row" spacing={1} sx={{ my: 1 }}>
						{data.status && <Chip label={data.status} />}
						{data.category?.name && (
							<Chip label={`Category: ${data.category.name}`} />
						)}
					</Stack>
				</motion.div>
				
				<motion.img
					src={img}
					alt={data.name}
					style={{ maxWidth: "100%", borderRadius: 8 }}
					onError={() => setImg(placeholder)}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					whileHover={{ scale: 1.02 }}
				/>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								component={RouterLink}
								to={`/pets/${data.id}/edit`}
								variant="contained"
							>
								Edit
							</Button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button component={RouterLink} to="/">
								Back
							</Button>
						</motion.div>
					</Stack>
				</motion.div>
			</Container>
		</motion.div>
	);
};

export default PetDetails;
