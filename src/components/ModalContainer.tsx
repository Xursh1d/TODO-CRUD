import { Card, Icon, Modal, Text } from "@gravity-ui/uikit";
import { Xmark } from "@gravity-ui/icons";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IModalContainerProps {
    children: ReactNode
    title: string
}
export default function ModalContainer({ children, title }: IModalContainerProps) {
    const navigate = useNavigate()

    return (
        <Modal open={true} onClose={() => navigate(-1)} className="modal__rounded">
            <Card view="clear" className="bg-white py-5 px-8 rounded-2xl w-[450px]">
                <div className="flex items-start justify-between py-6">
                    <Text variant="subheader-3" className="w-3/4">
                        {title}
                    </Text>
                    <button onClick={() => navigate(-1)}>
                        <Icon data={Xmark} size={16} />
                    </button>
                </div>
                {children}
            </Card>
        </Modal>
    )
}
