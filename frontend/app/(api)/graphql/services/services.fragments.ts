import { gql } from '@apollo/client';

// Service Fragment
export const SERVICE_FRAGMENT = gql`
  fragment ServiceFragment on Service {
    service_id
    service_name
    service_type
    description
    price
    business {
      business_id
      business_name
    }
    created_at
    updated_at
  }
`;
