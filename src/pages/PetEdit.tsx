import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, MenuItem, Button, Stack } from "@mui/material";
import { usePet, useUpdatePet } from "../hooks/usePets";
import Loading from "../components/Loading";

const schema = z.object({
	name: z.string().min(1),
	status: z.enum(["available", "pending", "sold"]),
	photoUrl: z.union([z.url(), z.literal("")]).optional(),
});
type FormValues = z.infer<typeof schema>;

const PetEdit = () => {
	const { id } = useParams();
	const { data: pet, isLoading } = usePet(Number(id));
	const updateMut = useUpdatePet();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		values: {
			name: pet?.name ?? "",
			status: pet?.status ?? "available",
			photoUrl: pet?.photoUrls?.[0] ?? "",
		},
	});

	async function onSubmit(values: FormValues) {
		await updateMut.mutateAsync({
			id: Number(id),
			name: values.name,
			status: values.status,
			photoUrls: values.photoUrl ? [values.photoUrl] : [],
		});
		navigate(`/pets/${id}`);
	}

	if (isLoading || !pet) return <Loading label="Preparing form..." />;

	return (
		<Container sx={{ py: 3 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2} maxWidth={420}>
					<TextField
						label="Name"
						{...register("name")}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<TextField select label="Status" {...register("status")}>
						{["available", "pending", "sold"].map((s) => (
							<MenuItem key={s} value={s}>
								{s}
							</MenuItem>
						))}
					</TextField>
					<TextField
						label="Photo URL"
						{...register("photoUrl")}
						error={!!errors.photoUrl}
						helperText={errors.photoUrl?.message}
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={updateMut.isPending}
					>
						Save
					</Button>
				</Stack>
			</form>
		</Container>
	);
};

export default PetEdit;
