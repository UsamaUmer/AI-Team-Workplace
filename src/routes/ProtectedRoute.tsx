import { Navigate } from "react-router-dom";
import { useAppStore } from "../app/store";


import { type ReactNode } from "react";
interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoute({children}: ProtectedRoutesProps) {

    const store = useAppStore.getState();
    if(store.currentUser !== null){
        return <Navigate to='/dashboard'></Navigate>
    }

  return <>{children}</>
}

export default ProtectedRoute