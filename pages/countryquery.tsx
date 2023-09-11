import { gql } from "@apollo/client";

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      languages {
        code
        name
      }
    }
  }
`;

export default LIST_COUNTRIES;