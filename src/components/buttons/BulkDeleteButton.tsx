import { Button, ButtonSize, Icon } from "@gravity-ui/uikit";
import { TrashBin } from "@gravity-ui/icons";

interface DeleteButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
  view?: string;
  icon?: typeof TrashBin | null;
  size?: ButtonSize | undefined;
  isLoading?: boolean;
}

function BulkDeleteButton({
  isDisabled = true,
  onClick,
  size = "l",
  icon = TrashBin,
  isLoading = false,
}: DeleteButtonProps) {
  return (
    <Button
      onClick={onClick}
      view="outlined-danger"
      size={size}
      disabled={isDisabled}
      loading={isLoading}
    >
      {icon && <Icon data={icon} />}
      Delete
    </Button>
  );
}

export default BulkDeleteButton;
