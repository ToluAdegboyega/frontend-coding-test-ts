import type { ApolloError } from '@apollo/client/errors';
import { useToast } from 'vue-toastification';
import type { GraphQLError } from 'graphql';

const toast = useToast();

export default {
  throwError(body: string) {
    toast.error(body);
  },
  throwGraphQLError(response: ApolloError) {
    const errors = response.graphQLErrors || [response.networkError];
    if (!errors.length) {
      this.throwError(response.message);
    }
    errors.forEach((error: GraphQLError) => {
      const message =
        (error && error.message) ||
        'We ran into an unidentified error. Please try again';
      this.throwError(message);
    });
  },
};
