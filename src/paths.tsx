import Challenge from "./pages/Challenge";
import InitiallPage from "./pages/InitiallPage";
import NewChallenge from "./pages/Challenges";
import Create from "./pages/Create";

export const Paths = [
  { path: "/", element: InitiallPage },
  { path: "new", element: NewChallenge },
  { path: "/card/:id", element: Challenge },
  { path: "/card/:id/create", element: Create },
];
