// Definimos nuestras actions types para luego importarlas en actions y/o reducer
// Esto lo haremos de la forma "ActionTypes.fetchUsers"
// Nos devuelve un indice. Si queremos que devuelva un string debemos asignarlo y luego cambiar el type en interfaces
export enum ActionTypes {
  logUser,
  getUserInfo,
  getAppointments,
  getSpecialities,
  getMedicSpeciality,
  logout,
  getHistory,
  updateUserInfo,
  changePassResponse,
  medicAppointments,
  getPreferenceId,
}
