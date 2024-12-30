
import { gql } from '@apollo/client';

// Appointments Fragment
export const APPOINTMENTS_FRAGMENT = gql`
  fragment AppointmentsFragment on Appointments {
    appointment_id
    service {
      service_id
      service_name
    }
    rating
    user_id
  }
`;