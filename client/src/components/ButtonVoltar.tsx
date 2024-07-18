
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ButtonVoltarProps {
    className?: string
}
const ButtonVoltar = ({ className }: ButtonVoltarProps) => {
    const router = useRouter()
    const clickToBack = () => {
        router.back();
    }
    return (
        <Button onClick={clickToBack} size="sm" className="bg-primaryTableText text-white" >
            Voltar
        </Button>
    )
}
export default ButtonVoltar


