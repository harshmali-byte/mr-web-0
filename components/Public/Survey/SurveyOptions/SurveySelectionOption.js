import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function SurveySelectionOption({ opt, mdItems, selectedOptions, maxSelection, setSelectedOptions }) {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        if (!selectedOptions) {
            setIsSelected(false);
            return;
        }

        setSelectedAnswers(selectedOptions);
        let isOptSelected = selectedOptions.indexOf(opt.Id) > -1;
        setIsSelected(isOptSelected);
    }, [selectedOptions])

    function selectOptions(optId) {
        let selections = selectedAnswers;

        let selectedIndex = selectedAnswers.indexOf(optId);

        if (selectedIndex > -1) {
            selections = selectedAnswers.filter(f => f !== optId)
        }
        else {
            if ((selections.length + 1) > maxSelection) {
                setSelectedOptions(selections);
                return;
            }

            selections.push(optId);
        }

        setSelectedOptions(selections);
        setIsSelected(!isSelected);
    }

    return (
        <Grid item xs={12} md={mdItems} sx={{ display: 'flex', flex: '0 1 auto' }}>
            <Button variant='contained' color={isSelected ? 'warning' : 'primary'} onClick={() => selectOptions(opt.Id)} sx={{ display: 'flex', flex: 1 }}>{opt.Name}</Button>
        </Grid>
    )
}