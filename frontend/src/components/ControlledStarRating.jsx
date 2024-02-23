import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ControlledStarRating({ onChange }) {
  const [value, setValue] = useState(5);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (onChange) {
            onChange(newValue);
          }
        }}
      />
    </Box>
  );
}
