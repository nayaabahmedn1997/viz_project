import { ColumnsPanelTrigger, ExportCsv, FilterPanelTrigger, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid'
import React from 'react'
import FlexBetween from '../FlexBetween'
import { InputAdornment, TextField, IconButton, Toolbar } from '@mui/material'
import { Search } from "@mui/icons-material";

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
  return (
   <Toolbar>
        <FlexBetween width="100%">
            <FlexBetween>
            <ColumnsPanelTrigger />
            <FilterPanelTrigger />
            <ExportCsv  />
            </FlexBetween>
            <TextField 
                label="Search..."
                sx={{mb:"0.5rem", width:"15rem"}}
                onChange={(e)=>setSearchInput(e.target.value)}
                value ={searchInput}
                variant='standard'
                InputProps={{
                    endAdornment:(
                        <InputAdornment
                        position='end'
                        >
                            <IconButton
                             onClick={() => {
                                setSearch(searchInput);
                                setSearchInput("");
                              }}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

        </FlexBetween>


   </Toolbar>
  )
}

export default DataGridCustomToolbar