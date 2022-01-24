import axios from 'axios'

export default async function populateAppointments(){
    //console.log('POPULATE APPOINTMENTS')
    
    const totalMedicPatient = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    const hours = [9,10,11,12,13,14,15,16,17]
    const minutes = [0,30]
    const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    const totalStudyTypes = [1,2,3,4,5]

    let totalAppointments = 40;
        for(let i=0; i<=totalAppointments; i++){
            const appointment = {
                date: `2022-02-${day[Math.floor((Math.random() * day?.length))]}`,
                time: `${hours[Math.floor((Math.random() * hours?.length))]}:${minutes[Math.floor((Math.random() * minutes.length))]}"`,
                patientId: totalMedicPatient[Math.floor((Math.random() * totalMedicPatient.length))],
                medicalStaffId: totalMedicPatient[(Math.floor(Math.random() * totalMedicPatient.length))]
            }
            const newAppointment = await axios.post('http://localhost:3001/appointments', appointment)
            
            const study = {
                    diagnosis: "Routine Lab Tests",
                    studyPDF: "https://www.medicalhub.com/",
                    studyTypeId: totalStudyTypes[(Math.floor(Math.random() * totalStudyTypes.length))],
                    medicalStaffId: totalMedicPatient[(Math.floor(Math.random() * totalMedicPatient.length))],
                    appointmentId: newAppointment.data.id,
                    patientId: newAppointment.data.PatientId
            }   
            const newStudy = await axios.post('http://localhost:3001/studies', study)                 
            
        }
        
}