import { useParams, Link as RouterLink } from "react-router-dom";
import { usePet } from "../hooks/usePets";
import { Container, Typography, Chip, Stack, Button } from "@mui/material";
import Loading from "../components/Loading";
import { useState } from "react";

const PetDetails = () => {
	const { id } = useParams();
	const { data, isLoading, error } = usePet(Number(id));
	const placeholder = "https://placehold.co/800x400?text=Pet";
	const [img, setImg] = useState<string>(data?.photoUrls?.[0] || placeholder);

	if (isLoading) return <Loading label="Loading pet..." />;
	if (error || !data) return <div>Pet not found.</div>;

	return (
		<Container sx={{ py: 3 }}>
			<Typography variant="h4">{data.name}</Typography>
			<Stack direction="row" spacing={1} sx={{ my: 1 }}>
				{data.status && <Chip label={data.status} />}
				{data.category?.name && (
					<Chip label={`Category: ${data.category.name}`} />
				)}
			</Stack>
			<img
				src={img}
				alt={data.name}
				style={{ maxWidth: "100%", borderRadius: 8 }}
				onError={() => setImg(placeholder)}
			/>
			<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
				<Button
					component={RouterLink}
					to={`/pets/${data.id}/edit`}
					variant="contained"
				>
					Edit
				</Button>
				<Button component={RouterLink} to="/">
					Back
				</Button>
			</Stack>
		</Container>
	);
};

export default PetDetails;
