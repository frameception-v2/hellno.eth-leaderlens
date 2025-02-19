import { DuneClient } from "@duneanalytics/client-sdk";
import { DUNE_QUERY_ID } from "~/lib/constants";

const DUNE_API_KEY = process.env.DUNE_API_KEY;

if (!DUNE_API_KEY) {
  throw new Error("DUNE_API_KEY environment variable is required");
}

const client = new DuneClient(DUNE_API_KEY);

export type LeaderboardEntry = {
  wallet_address: string;
  total_score: number;
  rank: number;
};

type DuneResponse = {
  rows: LeaderboardEntry[];
  execution_id: string;
  query_id: number;
};

export async function fetchLeaderboard(userAddress?: string): Promise<{
  data: LeaderboardEntry[];
  userPosition?: LeaderboardEntry;
}> {
  try {
    const executionResult = await client.runQuery({
      queryId: DUNE_QUERY_ID,
      queryParameters: [
        // Add any required parameters for your Dune query
      ],
    });

    const data = executionResult.result?.rows as LeaderboardEntry[] ?? [];
    
    // Sort by score descending
    const sortedData = data.sort((a, b) => b.total_score - a.total_score)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

    const userPosition = userAddress 
      ? sortedData.find(entry => entry.wallet_address.toLowerCase() === userAddress.toLowerCase())
      : undefined;

    return {
      data: sortedData.slice(0, 10), // Top 10
      userPosition
    };
  } catch (error) {
    console.error("Dune API Error:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
}
