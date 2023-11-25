import * as Icons from "react-icons/md";

export default function DynamicMaterialIcon({ icon }) {
  if (typeof icon === "string") {
    const IconComponent = Icons[icon];

    if (!IconComponent) {
      return <Icons.MdHelpCenter />;
    }

    return <IconComponent />;
  }
  if (typeof icon === "object") {
    const IconComponent = Icons[icon.type.name];

    if (!IconComponent) {
      return <Icons.MdHelpCenter />;
    }

    return <IconComponent />;
  }
}
