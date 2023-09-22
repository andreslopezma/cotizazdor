import React from 'react'
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
// hooks
import useFetch from '../hooks/useFetch';

function Cotizaciones() {
    const { data } = useFetch('quotations');
    return (
        <>
            <Typography variant='h5'>LISTADO DE COTIZACIONES</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Cliente</TableCell>
                            <TableCell align="center">Valor</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length ?
                                data.map(({ date_quotation, value_total, client, id }) => (
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="center">{date_quotation}</TableCell>
                                        <TableCell align="center">{client}</TableCell>
                                        <TableCell align="center">{value_total}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                aria-label="Disabled elevation buttons"
                                            >
                                                <Button>VER</Button>
                                                <Button>DOWNLOAD</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                )) :
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        colSpan={5}
                                    >
                                        Sin datos
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Cotizaciones