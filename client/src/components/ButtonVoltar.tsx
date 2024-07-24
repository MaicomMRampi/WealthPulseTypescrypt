
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ButtonVoltarProps {
    className?: string,
    size?: "sm" | "md" | "lg"
}
const ButtonVoltar = ({ className, size }: ButtonVoltarProps) => {
    const router = useRouter()
    const clickToBack = () => {
        router.back();
    }
    return (
        <Button onClick={clickToBack} size={size} className="bg-primaryTableText text-white" >
            Voltar
        </Button>
    )
}
export default ButtonVoltar


