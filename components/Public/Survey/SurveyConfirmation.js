import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

const style = {
    position: 'absolute',
    top: { xs: '30%', md: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '&:focus-visible': {
        outline: 'none'
    },
    width: { xs: '90%', md: '40%' }
};

export default function SurveyConfirmation({ showModal, setShowModal, onYes, onNo }) {
    return (
        <Modal
            open={showModal ? showModal : false}
            onClose={(e, reason) => { if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') { setShowModal(false) } }}
            aria-labelledby="Confirm Survey Submission"
            aria-describedby="Confirm Survey Submission"
            sx={{ overflow: 'auto' }}
        >
            <Card sx={style}>
                <CardContent>
                    <Typography id="survey-confirm-title" variant="h6" component="h2" textAlign='center'>
                        Submit
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                    <Box sx={{ my: 2 }}>
                        <Typography>Would you like to Submit the survey?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="outlined" onClick={onNo} sx={{ mr: 1 }}>No</Button>
                            <Button variant='contained' onClick={onYes}>Yes</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    )
}