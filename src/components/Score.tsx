"use client";

import { decreaseScore, increaseScore } from "@/app/actions/actions";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { useState } from "react";
import Button from "./buttons/QuantityButtons";
import { AuthUser } from "@/types/comment";

type ScoreProp = {
  score: number;
  id: number;
  currentUser: AuthUser | null;
  userVote: number | null;
  username: string;
};

function Score({ score, id, currentUser, userVote, username }: ScoreProp) {
  const [currentVote, setCurrentVote] = useState<number | null>(userVote);
  const [currentScore, setCurrentScore] = useState(score);

  function handleIncrease() {
    if (currentVote === 1) return;
    const diff = 1;
    setCurrentScore((prev) => prev + diff);
    setCurrentVote(1);
  }
  function handleDecrease() {
    if (currentVote === -1) return;
    const diff = 1;
    setCurrentScore((prev) => prev - diff);
    setCurrentVote(-1);
  }
  return (
    <div className="text-primary-purple-600 bg-primary-purple-200/30 flex h-10 w-25 items-center justify-between rounded-xl px-4 font-bold transition-all hover:scale-105 hover:opacity-80 lg:h-25 lg:w-10 lg:flex-col">
      <Button
        commentId={id}
        currentUser={currentUser}
        username={username}

        updateScore={() => increaseScore(id, currentUser)}
        onScoreUpdate={handleIncrease}
        voteDisabled={currentVote === 1}
        aria-label="Increase score."
        icon={
          <Image src={ICONS.plus} alt="Increase score" width={14} height={14} />
        }
      />
      {currentScore}
      <Button
        commentId={id}
        currentUser={currentUser}
        username={username}

        updateScore={() => decreaseScore(id, currentUser)}
        onScoreUpdate={handleDecrease}
        voteDisabled={currentVote === -1}
        aria-label="Decrease score."
        icon={
          <Image
            src={ICONS.minus}
            alt="Subtract score"
            width={14}
            height={14}
          />
        }
      />
    </div>
  );
}

export default Score;
