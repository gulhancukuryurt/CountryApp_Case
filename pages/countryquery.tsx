import { gql } from "@apollo/client";

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
    }
  }
`;

export default LIST_COUNTRIES;