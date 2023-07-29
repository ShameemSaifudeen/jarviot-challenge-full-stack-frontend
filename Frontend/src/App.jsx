import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.root}`]: {
    padding: theme.spacing(2),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const App = () => {
  const [driveData, setDriveData] = useState({
    files: [],
    totalSize: 0,
    publicFiles: [],
    externallySharedFiles: [],
    peopleWithAccess: {},
    riskCounter: 0,
    token: null
  });

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchDriveData = async () => {
      const response = await axios.get("http://localhost:5000/drive");
      if (response.data) {
        setDriveData(response.data);
        setAuth(true);
      }
    };

    fetchDriveData();
  }, []);

  const handleAuth = () => {
    window.location.href = "http://localhost:5000/auth";
  };

  const handleRevokeAccess = async () => {
    try {
      await axios.get(`http://localhost:5000/revoke/${driveData.token}`);
      setDriveData({
        files: [],
        totalSize: 0,
        publicFiles: [],
        externallySharedFiles: [],
        peopleWithAccess: {},
        riskCounter: 0,
        token: null
      });
      setAuth(false);
      alert("Access revoked successfully");
    } catch (error) {
      console.error("Failed to revoke access", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Google Drive Risk Report
        </Typography>
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
        {auth && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Total Storage Used"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <Typography variant="h5">
                    {driveData.totalSize} bytes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Public Files"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <Typography variant="h5">
                    {driveData.publicFiles.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Externally Shared Files"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <Typography variant="h5">
                    {driveData.externallySharedFiles.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="People with Access"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <Typography variant="h5">
                    {Object.keys(driveData.peopleWithAccess).length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Risk Counter"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <Typography variant="h5">{driveData.riskCounter}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader
                  title="Public Files"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>File Name</StyledTableCell>
                          <StyledTableCell align="right">Link</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {driveData.publicFiles.map((file) => (
                          <StyledTableRow key={file.name}>
                            <StyledTableCell component="th" scope="row">
                              {file.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.webViewLink}
                              </a>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader
                  title="Externally Shared Files"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>File Name</StyledTableCell>
                          <StyledTableCell align="right">Link</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {driveData.externallySharedFiles.map((file) => (
                          <StyledTableRow key={file.name}>
                            <StyledTableCell component="th" scope="row">
                              {file.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.webViewLink}
                              </a>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="People with Access"
                  sx={{ backgroundColor: alpha("#1976d2", 0.1) }}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell align="right">
                            Access to Files
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(driveData.peopleWithAccess).map(
                          ([person, files]) => (
                            <StyledTableRow key={person}>
                              <StyledTableCell component="th" scope="row">
                                {person}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {files.map((file) => (
                                  <div key={file.id}>
                                    <a
                                      href={file.webViewLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {file.name}
                                    </a>
                                  </div>
                                ))}
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default App;
