import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SERVICE } from '@/app/(api)/graphql/services/services.mutations';
import { GET_SERVICE_BY_ID } from '@/app/(api)/graphql/services/services.queries';
import { ApolloError } from '@apollo/client/errors'; // Import the error type
import { gql } from '@apollo/client';



// Define the structure for the GET_SERVICE_BY_ID response
export interface GetServiceByIdResponse {
  services: {
    service_id: number;
    service_name: string;
    service_category: string;
    service_description?: string;
    duration: string;
    price: number;
    created_at: string;
    updated_at: string;
  };
}

// Hook to execute the GET_SERVICE_BY_ID query
export const useGetServiceById = (service_id: number) => {
  //console.log("Service ID passed to the component:", service_id);

  const { data, loading, error } = useQuery<GetServiceByIdResponse>(GET_SERVICE_BY_ID, {
    variables: { service_id },
  });

  return {
    data,
    loading,
    error,
  };
};


