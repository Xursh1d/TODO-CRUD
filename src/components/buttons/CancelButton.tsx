import { Button, ButtonSize, ButtonView, Text } from "@gravity-ui/uikit";
import { useNavigate } from "react-router";

interface CancelButtonProps {
    view?: ButtonView;
    size?: ButtonSize;
}

export default function CancelButton({
    view = "flat-contrast",
    size = "l",
}: CancelButtonProps) {
    const navigate = useNavigate()

    return (
        <Button
            size={size}
            view={view}
            type="button"
            onClick={() => navigate(-1)}
        >
            <Text variant="body-1" color="primary">Cancel</Text>
        </Button>
    )
}
