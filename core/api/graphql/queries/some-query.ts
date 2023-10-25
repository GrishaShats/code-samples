import { gql } from 'apollo-angular';

export const someQuery = gql`
  query SomeElements {
    someElements {
      data {
        attributes {
          name
          value
          description
          icon {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
