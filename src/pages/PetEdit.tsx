import { usePet, useUpdatePet } from "../hooks/usePets";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../components/Loading";
import { Container, TextField, MenuItem, Button, Stack } from "@mui/material";

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
	
	const pageVariants = {
		initial: { opacity: 0, x: -20 },
		animate: { 
			opacity: 1, 
			x: 0,
			transition: { duration: 0.4, staggerChildren: 0.1 }
		},
		exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
	};

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { staggerChildren: 0.1 }
		}
	};

	const fieldVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<Container sx={{ py: 3 }}>
				<motion.form 
					onSubmit={handleSubmit(onSubmit)}
					variants={formVariants}
					initial="hidden"
					animate="visible"
				>
					<Stack spacing={2} maxWidth={420}>
						<motion.div variants={fieldVariants}>
							<TextField
								label="Name"
								{...register("name")}
								error={!!errors.name}
								helperText={errors.name?.message}
								fullWidth
							/>
						</motion.div>
						
						<motion.div variants={fieldVariants}>
							<TextField select label="Status" {...register("status")} fullWidth>
								{["available", "pending", "sold"].map((s) => (
									<MenuItem key={s} value={s}>
										{s}
									</MenuItem>
								))}
							</TextField>
						</motion.div>
						
						<motion.div variants={fieldVariants}>
							<TextField
								label="Photo URL"
								{...register("photoUrl")}
								error={!!errors.photoUrl}
								helperText={errors.photoUrl?.message}
								fullWidth
							/>
						</motion.div>
						
						<motion.div 
							variants={fieldVariants}
							whileHover={{ scale: 1.02 }} 
							whileTap={{ scale: 0.98 }}
						>
							<Button
								type="submit"
								variant="contained"
								disabled={updateMut.isPending}
								fullWidth
							>
								{updateMut.isPending ? "Saving..." : "Save"}
							</Button>
						</motion.div>
					</Stack>
				</motion.form>
			</Container>
		</motion.div>
	);
};

export default PetEdit;
