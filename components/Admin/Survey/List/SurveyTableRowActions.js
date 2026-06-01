import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { SurveyStatus } from '../../../Common/AdminConstants';
import dynamic from 'next/dynamic';

const SurveyAction = dynamic(() => import('./SurveyAction'));
const Loader = dynamic(() => import('../../../Common/Loader'));

export default function SurveyTableRowActions({ authorization, row, onOperationDone, actions, isAdmin, isAdminUser, setToastMessage }) {
    const [rowActions, setRowActions] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [editAction, setEditAction] = useState(null);
    const [nextActions, setNextActions] = useState([]);
    const [currentRow, setCurrentRow] = useState(null);

    useEffect(() => {
        if (!row) {
            return;
        }

        setCurrentRow(row);
    }, [row])

    useEffect(() => {
        if (!currentRow || !actions || actions.length === 0) {
            return;
        }

        setEditAction(null);
        setNextActions(null);
        setRowActions(actions.filter(f => f.CurrentState === currentRow.Status));
    }, [actions, currentRow])

    useEffect(() => {
        if (!currentRow || !rowActions || rowActions.length === 0) {
            return;
        }

        setCurrentStatus(rowActions[0].CurrentStatus);
        let possibleActions = []

        rowActions.every(ra => {
            if (!ra.NextStatus || !authorization[ra.NextStatus.Permission]) {
                return true;
            }

            if (ra.NextStatus.Id === SurveyStatus.Edit.Id) {
                setEditAction(ra.NextStatus);
                return true;
            }

            if (!isAdminUser && ra.CurrentStatus.Id === SurveyStatus.ClientApprove.Id && ra.NextStatus.Id === SurveyStatus.AdminReject.Id) {
                return true;
            }

            possibleActions.push(ra.NextStatus);
            return true;
        })

        setNextActions(possibleActions);

    }, [currentRow, rowActions, isAdminUser])

    function updateRow(model) {
        let updateRow = JSON.parse(JSON.stringify(currentRow));
        updateRow.Status = model.OperationId;
        setRowActions(null);
        setCurrentStatus(null);
        setCurrentRow(updateRow);
        onOperationDone(model);
    }

    return (
        <TableCell>
            {
                !currentRow && <Loader />
            }
            {
                currentStatus && <Typography variant='span' sx={{ color: currentStatus.ActionColor || '#000' }}>{currentStatus.StatusText}</Typography>
            }

            {
                editAction && <SurveyAction text="Edit" href={`/Admin/Survey/${isAdmin ? 'Admin' : 'Client'}/Edit/${currentRow.Id}`} response={currentRow} isAdmin={isAdmin} setToastMessage={setToastMessage} />
            }

            {
                nextActions && nextActions.length > 0 && nextActions.map((na, ind) => {
                    return (
                        <SurveyAction key={ind} text={na.ActionText} operation={na} response={currentRow} onOperationDone={updateRow} isAdmin={isAdmin} setToastMessage={setToastMessage} />
                    )
                })
            }
        </TableCell>
    )
}