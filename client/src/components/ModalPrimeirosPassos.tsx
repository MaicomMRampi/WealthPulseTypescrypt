import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
interface ObjetoInvestimento {

    [key: string]: any; // Caso existam outras propriedades que não foram especificadas
}

interface Props {
    isOpen: boolean;
    onClose: any;
}


export default function ModalDele({ isOpen, onClose }: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <>
            <Modal size="2xl" className="bg-BgCardPadrao rounded-lg" backdrop="opaque" isOpen={isOpen} onClose={onClose} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                <ModalContent>
                    {() => (
                        <>
                            <Box sx={{ width: '100%' }}>
                                <Stepper nonLinear activeStep={activeStep}>
                                    {steps.map((label, index) => (
                                        <Step key={label} completed={completed[index]}>
                                            <StepButton color="inherit" onClick={handleStep(index)}>
                                                {label}
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div>
                                    {allStepsCompleted() ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleReset}>Reset</Button>
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                Step {activeStep + 1}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Button

                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}

                                                >
                                                    Back
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleNext}>
                                                    Next
                                                </Button>
                                                {activeStep !== steps.length &&
                                                    (completed[activeStep] ? (
                                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                            Step {activeStep + 1} already completed
                                                        </Typography>
                                                    ) : (
                                                        <Button onClick={handleComplete}>
                                                            {completedSteps() === totalSteps() - 1
                                                                ? 'Finish'
                                                                : 'Complete Step'}
                                                        </Button>
                                                    ))}
                                            </Box>
                                        </React.Fragment>
                                    )}
                                </div>
                            </Box>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
