import * as Icons from "react-icons/md";

export default function DynamicMaterialIcon({ icon }) {
  if (!icon) return <Icons.MdOutlineHelpCenter />;

  if (typeof icon === "string") {
    const IconComponent = Icons[icon];

    if (!IconComponent) {
      return <Icons.MdOutlineHelpCenter />;
    }

    return <IconComponent />;
  }
  if (typeof icon === "object") {
    const IconComponent = Icons[icon.type.name];

    if (!IconComponent) {
      return <Icons.MdOutlineHelpCenter />;
    }

    return <IconComponent />;
  }
}
