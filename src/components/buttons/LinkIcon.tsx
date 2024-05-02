import { ChevronRight } from "@gravity-ui/icons";
import { Link } from "react-router-dom";
import { Button, Icon, IconData } from "@gravity-ui/uikit";

interface ILinkIcon { to: string, icon?: IconData }

export default function LinkIcon({ to, icon = ChevronRight }: ILinkIcon) {
  return (
    <Link to={to}>
      <Button view="flat-secondary" size="m">
        <Icon data={icon} size={16} />
      </Button>
    </Link>
  );
}
