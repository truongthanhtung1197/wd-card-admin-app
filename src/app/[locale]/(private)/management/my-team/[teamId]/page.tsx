"use client";
import { notFound } from "next/navigation";

import TeamMembersDetailView from "./TeamMembersDetail.view";

interface TeamMembersDetailPageProps {
  params: {
    teamId: string;
    locale: string;
  };
}

const TeamMembersDetailPage = ({ params }: TeamMembersDetailPageProps) => {
  const { teamId } = params;

  // Validate teamId is numeric
  if (!teamId || isNaN(Number(teamId))) {
    notFound();
  }

  return <TeamMembersDetailView teamId={teamId} />;
};

export default TeamMembersDetailPage;
