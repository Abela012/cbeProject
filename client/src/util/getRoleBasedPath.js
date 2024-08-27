import { rolesList } from "./userRoles";

export function getRoleBasedPath(role) {
  if (rolesList.secretary == role) {
    return "/secretary/case-management";
  } else if (
    rolesList.president == role ||
    rolesList.vp == role ||
    rolesList.cos == role
  ) {
    return "/pvc/appointment-list";
  } else if (rolesList.boredMembers == role || rolesList.staff == role) {
    return "/bs/appointment-list";
  } else if (rolesList.admin == role) {
    return "/admin/user-mangement";
  }
}
