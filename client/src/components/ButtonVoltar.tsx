
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ButtonVoltarProps {
    className?: string,
    size?: "sm" | "md" | "lg",
    tamanho: boolean
}
const ButtonVoltar = ({ className, tamanho, size }: ButtonVoltarProps) => {
    const router = useRouter()
    const clickToBack = () => {
        router.back();
    }
    return (
        <Button fullWidth={tamanho ? tamanho : false} size={size} onClick={clickToBack} className="bg-[#f97316] " >
            Voltar
        </Button>
    )
}
export default ButtonVoltar


