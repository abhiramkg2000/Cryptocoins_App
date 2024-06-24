import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { CryptoCurrencyDataType } from "../../types/common.types";
import { formatCoinData } from "../../helper/helper";

import "./cryptoInfoTable.scss";

export default function CryptoInfoTable({
  coinData,
}: {
  coinData: CryptoCurrencyDataType;
}) {
  const formatedCoinData = formatCoinData(coinData);

  return (
    <TableContainer className="crypto_info_table_container">
      <Table size="small" className="crypto_info_table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formatedCoinData?.map(({ field, value }, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{field}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
