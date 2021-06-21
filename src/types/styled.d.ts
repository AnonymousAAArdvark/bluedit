import "styled-components";
interface IPalette {
  main: string
  contrastText: string
}
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string,
      mainUpvote: string,
      background: string,
      mainBorder: string,
      border: string,
      alt: string,
      altHover: string,
      altActive: string,
      altDownvote: string,
      search: string,
      text: string,
      grey: string,
      vote: string,
    },
  }
}