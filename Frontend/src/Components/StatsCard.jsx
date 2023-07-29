import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const StatsCard = ({ title, value }) => {
  return (
    <Card>
      <CardHeader title={title} sx={{ backgroundColor: alpha("#1976d2", 0.1) }} />
      <CardContent>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
