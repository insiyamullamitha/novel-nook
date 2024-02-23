import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function StarRating({ value }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="half-rating" precision={0.5} value={value} readOnly />
    </Box>
  );
}
