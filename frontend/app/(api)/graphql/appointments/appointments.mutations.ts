import { gql } from '@apollo/client';
import { APPOINTMENTS_FRAGMENT } from './appointments.fragments';

// Appointments Mutations
export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($createAppointmentDto: CreateAppointmentDto!) {
    createAppointment(createAppointmentDto: $createAppointmentDto) {
      ...AppointmentsFragment
    }
  }
  ${APPOINTMENTS_FRAGMENT}
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($updateAppointmentDto: UpdateAppointmentDto!) {
    updateAppointment(updateAppointmentDto: $updateAppointmentDto) {
      ...AppointmentsFragment
    }
  }
  ${APPOINTMENTS_FRAGMENT}
`;

export const DELETE_APPOINTMENT = gql`
  mutation RemoveAppointment($appointment_id: Int!) {
    removeAppointment(appointment_id: $appointment_id)
  }
`;
