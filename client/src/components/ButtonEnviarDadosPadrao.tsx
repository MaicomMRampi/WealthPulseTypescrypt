import { Button } from "@nextui-org/react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { CircularProgress } from "@nextui-org/react";



export default function ButtonEnviarDadosPadrao({ onSubmit, isSubmiting }: any) {
    return (
        <Button
            onClick={onSubmit}
            className="p-6 text-sm"
            size="sm"
            color="success"

            endContent={isSubmiting ? <CircularProgress className=" ml-3 w-[24px] h-[24px]" aria-label="Loading..." color="primary" /> : <PiPaperPlaneTiltFill />}
        >
            Salvar
        </Button>
    );
}