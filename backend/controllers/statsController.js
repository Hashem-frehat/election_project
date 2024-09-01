const User = require("../models/results_user");
const LocalList = require("../models/results_local_list");
const LocalCandidate = require("../models/results_local_candidate");
const VotingSystem = require("../models/results_party");

exports.getStats = async (req, res) => {
  try {
    const localVoteCount = await User.getLocalVoteCount();
    const listsInfo = await LocalList.getListsInfo();
    const candidatesInfo = await LocalCandidate.getCandidatesInfo();
    const votingRateByCircle = await User.getVotingRateByCircle();
    const thresholdByCircle = await User.getThresholdByCircle();
    const listsInfoWithThreshold = await LocalList.getListsInfoWithThreshold();
    const topCandidates = await LocalList.getTopCandidatesForLists(
      listsInfoWithThreshold
    );
    const specialSeats = await LocalList.getSpecialSeats();

    res.json({
      localVoteCount,
      listsInfo,
      candidatesInfo,
      votingRateByCircle,
      thresholdByCircle,
      listsInfoWithThreshold,
      topCandidates,
      specialSeats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatss = async (req, res) => {
  try {
    const partyVoters = await VotingSystem.getPartyVoters();
    const totalPartyVoters = partyVoters.count;
    const threshold = totalPartyVoters * 0.025;

    const partyLists = await VotingSystem.getPartyLists();
    const candidates = await VotingSystem.getCandidates();

    const qualifiedLists = partyLists.filter(
      (list) => list.COUNT_OF_VOTES >= threshold
    );
    const totalQualifiedVotes = qualifiedLists.reduce(
      (sum, list) => sum + list.COUNT_OF_VOTES,
      0
    );
    const totalrealvoters = partyLists.reduce(
      (sum, list) => sum + list.COUNT_OF_VOTES,
      0
    );

    const seatsPerList = qualifiedLists.map((list) => ({
      ...list,
      seats: Math.round((list.COUNT_OF_VOTES / totalQualifiedVotes) * 41),
    }));

    // // Ensure total seats is exactly 41
    let totalSeats = seatsPerList.reduce((sum, list) => sum + list.seats, 0);
    if (totalSeats !== 41) {
      const diff = 41 - totalSeats;
      // Add or subtract seats from the list with the largest remainder
      const listToAdjust = seatsPerList.reduce((prev, current) =>
        ((current.COUNT_OF_VOTES / totalQualifiedVotes) * 41) % 1 >
        ((prev.COUNT_OF_VOTES / totalQualifiedVotes) * 41) % 1
          ? current
          : prev
      );
      listToAdjust.seats += diff;
    }

    const electedCandidates = seatsPerList.flatMap((list) =>
      candidates
        .filter((candidate) => candidate.LIST_ID == list.LIST_ID)
        .sort((a, b) => b.COUNT_OF_VOTES - a.COUNT_OF_VOTES)
        .slice(0, list.seats)
    );

    const totalElectedCandidates = electedCandidates.length;
    const blankVotes = totalPartyVoters - totalrealvoters;

    res.json({
      totalPartyVoters,
      totalQualifiedVotes,
      threshold,
      qualifiedLists,
      seatsPerList,
      electedCandidates,
      totalElectedCandidates,
      blankVotes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
