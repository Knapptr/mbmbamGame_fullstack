export const api = {
  url: "http://localhost:3000",
  randomRoute: "/lyrics/random",
  flagRoute(id) {
    return `/lyrics/${id}`;
  },
};
