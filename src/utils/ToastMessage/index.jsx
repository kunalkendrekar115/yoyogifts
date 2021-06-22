import { useEffect, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { AppContext } from "../AppContext";

const ToastMessage = () => {
  const toast = useToast();

  const {
    toastMessage: { message, status = "info" },
    showToastMessage
  } = useContext(AppContext);

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: status,
        isClosable: true,
        onCloseComplete: () => showToastMessage({ message: null, status: null })
      });
    }
  }, [message]);

  return <></>;
};

export default ToastMessage;
