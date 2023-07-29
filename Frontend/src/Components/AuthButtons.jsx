import React from "react";
import { Button, Box } from "@mui/material";

const AuthButtons = ({ auth, handleAuth, handleRevokeAccess }) => {
  return (
    <Box mb={3}>
      {auth ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRevokeAccess}
        >
          Revoke Access
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAuth}>
          Link Drive
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
