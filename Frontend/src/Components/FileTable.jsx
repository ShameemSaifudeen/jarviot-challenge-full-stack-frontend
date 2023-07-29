import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FileTable = ({ title, data }) => {
  return (
    <Card>
      <CardHeader title={title} sx={{ backgroundColor: alpha("#1976d2", 0.1) }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>File Name</StyledTableCell>
                <StyledTableCell align="right">Link</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((file) => (
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
  );
};

export default FileTable;
