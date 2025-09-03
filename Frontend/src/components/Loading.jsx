import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ text = "Yükleniyor..." }) {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <CircularProgress size={60} thickness={4} sx={{ color: 'orange' }} />
            <Typography variant="h6" sx={{ color: 'orange' }}>
                {text}
            </Typography>
        </Box>
    );
}
