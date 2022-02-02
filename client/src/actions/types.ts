// Definimos nuestras actions types para luego importarlas en actions y/o reducer
// Esto lo haremos de la forma "ActionTypes.fetchUsers"
// Nos devuelve un indice. Si queremos que devuelva un string debemos asignarlo y luego cambiar el type en interfaces
export enum ActionTypes {
  logUser,
  getPatientInfo,
  getAppointments,
  getSpecialities,
  getMedicSpeciality,
  logout,
  getHistory,
  updatePatientInfo,
  changePassResponse,
  medicAppointments,
  specAppointments,
  getPreferenceId,
  getAppointmentsPatients,
}
