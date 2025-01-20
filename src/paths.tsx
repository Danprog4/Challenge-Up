import Challenge from "./pages/Challenge";
import InitiallPage from "./pages/InitiallPage";
import NewChallenge from "./pages/Challenges";
import Create from "./pages/CreatePage";
import ChallengeInfo from "./pages/ChallengeInfo";

export const Paths = [
  { path: "/", element: InitiallPage },
  { path: "new", element: NewChallenge },
  { path: "/card/:id", element: Challenge },
  { path: "/card/:id/create", element: Create },
  { path: "/card/create", element: Create },
  { path: "/challenge/:id", element: ChallengeInfo },
];
