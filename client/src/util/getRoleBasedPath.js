import { rolesList } from "./userRoles";

export function getRoleBasedPath(role) {
  if (rolesList.secretary == role) {
    return "/secretary/manage-appointment";
  } else if (rolesList.president == role || rolesList.vp == role) {
    return "/pv/manage-appointment";
  } else if (rolesList.cos == role) {
    return "/cos/manage-appointment";
  } else if (rolesList.boredMembers == role || rolesList.staff == role) {
    return "/bs/manage-appointment";
  } else if (rolesList.admin == role) {
    return "/admin/user-mangement";
  }
}
