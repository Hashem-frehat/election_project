import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./page/Header"; // قم باستيراد مكون Header
import Home from "./page/Home";
import AdminDashboard from "./page/adminDash/dashboard.jsx";
import RoomPage from "./comonamt/room.jsx";
// افترض أنك أنشأت مكون Home
// import Vote from "./Vote"; // افترض أنك أنشأت مكون Vote
// import Apply from "./Apply"; // افترض أنك أنشأت مكون Apply
// import Services from "./Services"; // افترض أنك أنشأت مكون Services
// import Results from "./Results"; // افترض أنك أنشأت مكون Results
// import Contact from "./Contact"; // افترض أنك أنشأت مكون Contact
import PartyCandidatesRequestForm from "./CandidatesRequest.jsx";
import PaymentComponent from "./payment/payment.jsx";
import LocalListForm from "./CandidatesRequest.jsx";
import ArabicGrid from "./cities";
import "./App.css";
import ElectionCircleSelection from "./listtype";
// import VotingCandidatesGrid from "./local_voting.jsx";
// import Voting from "./local_votes.jsx";
import VotingSystem from "./VotingSystem.jsx";
import PartyListForm from "./PartyListForm.jsx";
import Results from "./results.jsx";
import PartyListVoting from "./PartyListVoting.jsx";

import News from "./news.jsx";
import Log_in_new from "./page/log_in_new.jsx";
import Log_in from "./page/sign_up.jsx";
import Log_in_home from "./page/log_in_home.jsx";
import ServiceForm from "./page/adminDash/mulitformservices.jsx";
import Update_password from "./page/update_password.jsx";
import VotingResults from "./partyresult.jsx";
import Footer from "./footer.jsx";
// import Home from "./page/Home";
function App() {
  return (
    <Router>
      <Header />
      {/* <Log_in />
      <PartyResults />
      <VotingSystem />
      <LocalListForm />
      <PartyListForm />
      <Results />
      {/* <News /> */}
      {/* <PartyListVoting />
      <ElectionCircleSelection />  */}
      {/* <PaymentComponent /> */}
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Log_in />} />
        <Route path="/log-in-home" element={<Log_in_home />} />
        <Route path="/log-in-new" element={<Log_in_new />} />
        <Route path="/update-pass" element={<Update_password />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/area" element={<ArabicGrid />} />
        <Route path="/type" element={<ElectionCircleSelection />} />
        <Route path="/localVote" element={<VotingSystem />} />
        <Route path="/partyVote" element={<PartyListVoting />} />
        <Route path="/results" element={<Results />} />
        <Route path="/partyresult" element={<VotingResults />} />
        <Route path="/services" element={<ServiceForm />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/request" element={<PartyCandidatesRequestForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
