import {
Box,
    Button,
    Stack,
    Typography,

} from "@mui/material";
import { ArrowBack, Save, Cancel, Add, PhotoCamera } from "@mui/icons-material";
import { useRef, useState } from "react";
import ProfilePhoto from "../company/ProfilePhoto";
import CompanyInformation from "../company/CompanyInformation";
import ContactInformation from "../company/ContactInformation";
import CompanyBenifits from "../company/CompanyBenifits";

type EditCompanyProfileProps = {
    onBack: () => void;
};

export default function EditCompanyProfile({ onBack }: EditCompanyProfileProps) {
        return (
            <Box p={3}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button startIcon={<ArrowBack />} onClick={onBack}>
                        Back to Dashboard
                    </Button>
                    <Box>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: "#ddd",
                                color: "#000",
                                fontWeight: 600,
                                textTransform: "none",
                                borderRadius: "6px",
                                px: 3,
                                py: 1,
                                mr: 1,
                                "&:hover": {
                                    borderColor: "#bbb",
                                    backgroundColor: "#f9f9f9",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            sx={{
                                backgroundColor: "#F15A29",
                                fontWeight: 600,
                                textTransform: "none",
                                borderRadius: "6px",
                                px: 3,
                                py: 1,
                                "&:hover": {
                                    backgroundColor: "#d94e22",
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
                <Typography variant="h5" gutterBottom>
                    Edit Company Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Update your company information
                </Typography>
                <Stack spacing={3}>
                    <ProfilePhoto />
                    <CompanyInformation />
                    <ContactInformation />
                    <CompanyBenifits />
                </Stack>
            </Box>
        );
    }
