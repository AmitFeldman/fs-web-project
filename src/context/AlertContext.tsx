import React, {createContext, useState, FC, useContext} from 'react';
import AlertSnackbar from '../components/AlertSnackbar/AlertSnackbar';

export interface AlertData {
  message: string;
  redirectPath?: string;
  buttonText?: string;
}

interface AlertContextData {
  alert: (data: AlertData) => void;
}

const AlertContext = createContext<AlertContextData>({
  alert: () => {},
});

const AlertProvider: FC = ({children}) => {
  const [alertData, setAlertData] = useState<AlertData>();

  const alert = (data: AlertData) => {
    setAlertData(data);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
      }}>
      {alertData && <AlertSnackbar alertData={alertData} />}
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error(`useAlert must be used within a AlertProvider`);
  }

  return context;
};

export {AlertProvider, useAlert};
