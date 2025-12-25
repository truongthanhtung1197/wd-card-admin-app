export enum TEAM_ROLE {
  LEADER = "lead",
  MEMBER = "member",
}

export enum TEAM_MEMBER_ROLE {
  LEADER = "LEADER",
  VICE_LEADER = "VICE_LEADER",
  MEMBER = "MEMBER",
}

export const TEAM_MEMBER_ROLE_OPTIONS = [
  {
    label: "Leader",
    key: TEAM_MEMBER_ROLE.LEADER,
  },
  {
    label: "Vice Leader",
    key: TEAM_MEMBER_ROLE.VICE_LEADER,
  },
  {
    label: "Member",
    key: TEAM_MEMBER_ROLE.MEMBER,
  },
];
