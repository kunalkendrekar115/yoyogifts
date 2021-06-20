import { colors } from "./variables";

export const buttonStyle = {
  Button: {
    variants: {
      outline: {
        "border-color": colors["primary-1"],
        color: colors["primary-1"],
        bg: "white"
      },
      solid: () => ({
        _hover: {
          background: colors["primary-1"]
        },
        color: "white",
        bg: colors["primary-1"]
      })
    }
  }
};
