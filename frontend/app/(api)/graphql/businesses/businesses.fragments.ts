
import { gql } from '@apollo/client';

// Business Fragment
export const BUSINESS_FRAGMENT = gql`
  fragment BusinessFragment on Business {
    business_id
    business_name
    email
    phone_number
    address
    operating_hours
    services {
      service_id
      service_name
    }
    created_at
    updated_at
  }
`;

