##REST API, Apollo GraphQL client with REST Adapter
You can start using Apollo Client without switching your server to GraphQL. This is possible because of a library called Apollo Link REST. Using this library allows you to get the power of Apollo Client without making any change to your REST API.

If changing your client is faster than modifying your server, then this is a good step before switching to a GraphQL API.

*Benefits*
  1.Declarative data fetching
  2.Zero config client-side caching
*Drawbacks* (Comparing to complete GraphQL API + Apollo Client)
  1.Server determines HTTP payload
  2.More HTTP calls than GraphQL

## Multiple endpoints
If you want to be able to use multiple endpoints, you should create your link like so:

  `const link = new RestLink({ endpoints: { v1: 'api.com/v1', v2: 'api.com/v2' } });`
Then you need to specify in the rest directive the endpoint you want to use:

  ```
  const postTitleQuery1 = gql`
    query postTitle {
      post @rest(type: "Post", path: "/post", endpoint: "v1") {
        id
        title
      }
    }
  `;
  const postTitleQuery2 = gql`
    query postTitle {
      post @rest(type: "[Tag]", path: "/tags", endpoint: "v2") {
        id
        tags
      }
    }
  `;
  ```
If you have a default endpoint, you can create your link like so:

  ```
  const link = new RestLink({
    endpoints: { github: 'github.com' },
    uri: 'api.com',
  });
  ```
Then if you do not specify an endpoint in your query the default endpoint (the one you specify in the uri option.) will be used.