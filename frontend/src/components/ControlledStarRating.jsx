import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function ControlledStarRating({ onChange }) {
  const [value, setValue] = useState(3);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="half-rating"
        defaultValue={2.5}
        precision={0.5}
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
