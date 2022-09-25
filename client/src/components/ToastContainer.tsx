import React, { createContext, useState } from "react";
import BootstrapToastContainer from "react-bootstrap/ToastContainer";
import Notification from "./Notifications";

type TNotify = {
  date: string;
  body: string;
};

export const useToast = createContext<(alert: TNotify) => void>(
  (alert: TNotify) => {}
);

function ToastContainer(props: React.PropsWithChildren) {
  const [notifications, setNotifications] = useState<TNotify[]>([]);
  const addAlert = (alert: TNotify) => {
    setNotifications((pre) => [...pre, alert]);
  };
  return (
    <>
      <BootstrapToastContainer className="p-3" position={"top-end"}>
        {notifications.map((toast) => (
          <Notification body={toast.body} date={toast.date} />
        ))}
      </BootstrapToastContainer>
      <useToast.Provider value={addAlert}>{props.children}</useToast.Provider>
    </>
  );
}

export default ToastContainer;
