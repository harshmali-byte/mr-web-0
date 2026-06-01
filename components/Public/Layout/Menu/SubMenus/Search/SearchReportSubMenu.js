import React, { useState, useEffect } from 'react';
import { TextField, Link, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { ApiHandler } from '../../../../../Api/ApiHandler';

export default function SearchReportSubMenu({ textVariant, textPlaceholder, textColor, searchKeyword }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([{ Name: "Type at least 3 letters to search post", Id: 0 }]);
    const [searchText, setSearchText] = useState('');
    const [searchInputText, setSearchInputText] = useState('');
    const [searching, setSearching] = useState(false);
    let searchTimeout;
    let searchAbortController = new AbortController();

    useEffect(() => {
        setSearching(true);
        setSearchText('');
        setSearchInputText(searchKeyword || '');
    }, [searchKeyword])

    useEffect(() => {
        if (!searchInputText || searchInputText.length <= 3) {
            setSearching(false);
            return;
        }

        WaitForSearch();

        return (() => {
            searchAbortController.abort();
        })
    }, [searchInputText])

    function WaitForSearch() {
        searchTimeout = setTimeout(function () {
            SearchReport(searchInputText);
        }, 800)
    }

    function SearchReport(searchVal) {
        searchAbortController.abort();
        searchAbortController = new AbortController();

        setSearching(true);
        ApiHandler.ApiService.Post({ SearchText: searchVal }, ApiHandler.ApiUrls.Research.Search, searchAbortController)
            .then(
                (result) => {
                    if (searchAbortController.signal.aborted) {
                        setSearching(false);
                        return;
                    }

                    if (result && result.IsSuccess && result.Data) {
                        setOpen(true);
                        setOptions(result.Data);
                        setSearching(false);
                        return;
                    }

                    setOptions([{ Name: result && result.Message ? result.Message : "Failed to search report, please try again.", Id: 0 }]);
                    setSearching(false);
                },
                (error) => {
                    setSearching(false);
                    console.error(error);
                }
            )
    }

    return (
        <Autocomplete
            sx={{
                backgroundColor: 'transparent',
                [theme.breakpoints.down('lg')]: {
                    backgroundColor: '#ffffff'
                },
                '& .MuiAutocomplete-input': {
                    color: textColor ? textColor : 'inherit'
                },
                '& .MuiInput-underline::before': { borderColor: textColor ? textColor : 'inherit' },
                '& .MuiAutocomplete-clearIndicator': { color: textColor ? textColor : 'inherit' }
            }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setSearching(false);
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
            getOptionLabel={(option) => option.Name || ''}
            renderOption={(props, option, state) => {
                return (
                    <ListItem key={option.Id} sx={{
                        borderBottom: '1px solid #ccc',
                        '&.MuiListItem-root:last-child': { borderBottom: 'none' }
                    }}>
                        {
                            option.CategoryUrl && option.MetaUrl
                                ? <Link href={`/${option.CategoryUrl}/${option.MetaUrl}`} underline="none" target="_blank">
                                    {option.Name}
                                </Link>
                                : <Typography variant="body1" component="span">{option.Name}</Typography>
                        }
                    </ListItem>
                )
            }}
            value={searchText}
            onChange={(event, newValue) => {
                if (event && event.keyCode && event.keyCode === 13) {
                    return;
                }
                setSearchText(newValue || '');
                setSearchInputText(newValue || '');
            }}
            inputValue={searchInputText}
            onInputChange={(event, newInputValue) => {
                clearTimeout(searchTimeout);
                if (event && event.keyCode && event.keyCode === 13) {
                    return;
                }
                setSearchInputText(newInputValue || '');
            }}
            options={options}
            loading={searching}
            freeSolo={true}
            size="small"
            forcePopupIcon
            selectOnFocus
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant={textVariant ? textVariant : "outlined"}
                    placeholder={textPlaceholder ? textPlaceholder : "Search Reports"}
                    size="small"
                    spellCheck="true"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {
                                    searching
                                        ? <CircularProgress size={20} sx={{ color: textColor || 'inherit' }} />
                                        : null
                                }
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
}