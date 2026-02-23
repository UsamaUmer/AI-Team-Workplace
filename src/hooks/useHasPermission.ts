import { useAppStore } from "../app/store";
import { rolePermissions, type Permission } from "../constants/permissions";

export function useHasPermission(permission: Permission){
    const currentUser = useAppStore((state)=> state.currentUser);
    if(!currentUser){
        return false;
    }

    const permissions = rolePermissions[currentUser.role];

    return permissions.includes(permission);

}
