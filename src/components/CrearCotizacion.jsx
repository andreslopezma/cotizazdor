import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Chip, Divider, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';

// hooks
import useForm from '../hooks/useForm';
import useCreate from '../hooks/useCreate';
import useFetch from '../hooks/useFetch';

function CrearCotizacion() {
    const [table, setTable] = useState([]);
    const [products, setProducts] = useState([]);

    const { data } = useFetch('products');

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const {
        handleInputChange,
        formulario
    } = useForm({
        name: '',
        lastname: '',
        address: '',
        date_quotation: ''
    });

    const handleProductChange = (productId, rowId) => {
        /*const updatedRows = table.map(row => {
            if (row.id === rowId) {
                const product = products.find(prod => prod.id === productId);
                const valueUnit = product ? product.product_price : 0;
                const valueTotal = valueUnit * (row.cantidad || 0);

                return {
                    ...row,
                    value_unit: valueUnit,
                    value_total: valueTotal,
                    product_id: productId
                };
            }
            return row;
        });

        setTable(updatedRows);*/
    }

    const handleQuantityChange = (quantity, rowId) => {
        const updatedRows = table.map(row => {
            if (row.id === rowId) {
                const product = products.find(prod => prod.id === row.product_id);
                const valueUnit = product ? product.product_price : 0;
                const valueTotal = valueUnit * quantity;

                return {
                    ...row,
                    cantidad: quantity,
                    value_total: valueTotal
                };
            }
            return row;
        });

        setTable(updatedRows);
    }


    const addRow = () => {
        const rowId = uuidv4();
        setTable(
            ...table,
            [
                {
                    id: rowId,
                    producto: <FormControl fullWidth>
                        <InputLabel id="product">Producto</InputLabel>
                        <Select
                            labelId="product"
                            id="product_id"
                            label="Producto"
                            name="product_id"
                            onChange={({ target }) => {
                                handleProductChange(target.value, rowId);
                            }}
                        >
                            <MenuItem value={0}>Selecione un Producto</MenuItem>
                            {
                                products.length
                                    ?
                                    products.map(({ id, product_name }) => {
                                        return <MenuItem key={uuidv4()} value={id}>{product_name}</MenuItem>
                                    })
                                    :
                                    <MenuItem value={0}>Sin Productos</MenuItem>
                            }
                        </Select>
                    </FormControl>,
                    cantidad: <TextField
                        id="quantity"
                        name="quantity"
                        label="Cantidad"
                        variant="standard"
                        type="number"
                        onClick={({ target }) => {
                            handleQuantityChange(target.value, rowId);
                        }}
                    />,
                    value_unit: 0,
                    value_total: 0
                }
            ]
        );
    }

    const { name, lastname, address, date_quotation } = formulario;

    const { sendData } = useCreate('/', '/quotation');
    return (
        <>
            <Divider sx={{ mb: 4, mt: 2 }} textAlign="center" >
                <Chip label={"Crear Cotización"} />
            </Divider>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        id="name"
                        value={name}
                        placeholder="(ej. Jhon, Andres)"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Apellido"
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        placeholder="(ej. Lopez)"
                        type="text"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Direccion"
                        name="address"
                        id="address"
                        placeholder="(ej. carrera 10)"
                        type="text"
                        value={address}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Fecha"
                        name="date_quotation"
                        id="date_quotation"
                        type="date"
                        value={date_quotation}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
                <Tooltip title="Agregar un nuevo producto">
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={addRow}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
            <TableContainer component={Paper} sx={{ mb: 4, mt: 2 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Producto</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="center">Valor Unit</TableCell>
                            <TableCell align="center">Valor Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            table.length
                                ?
                                table.map(({ producto, cantidad, value_unit, value_total }) => {
                                    return (
                                        <TableRow
                                            key={1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {producto}
                                            </TableCell>
                                            <TableCell align="center">{cantidad}</TableCell>
                                            <TableCell align="center">{value_unit}</TableCell>
                                            <TableCell align="center">{value_total}</TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Sin Productos Agregados</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2}>
                <Grid item container justifyContent="center" alignItems="center">
                    <Stack>
                        <Button
                            variant="outlined"
                            startIcon={<SaveAsIcon />}
                            onClick={() => sendData(formulario)}
                        >
                            Cotizar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default CrearCotizacion  