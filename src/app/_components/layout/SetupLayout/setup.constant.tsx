import { ROUTERS } from "@/constant";
import { ADMIN_ROLE, AdminRoleType } from "@/constant/admin.constant";

export const getSideBar = ({ admin }: { admin: any }) => {
  const role = admin?.role?.roleName as AdminRoleType;

  const managerAndSuperAdminSidebar = [
    {
      text: "Admin",
      link: ROUTERS.MANAGEMENT_ADMIN,
      children: [
        {
          text: null,
          link: ROUTERS.MANAGEMENT_ADMIN_CREATE,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_ADMIN_DETAIL,
        },
      ],
    },
    {
      text: "SEOer",
      link: ROUTERS.MANAGEMENT_SEOER,
      children: [
        {
          text: null,
          link: ROUTERS.MANAGEMENT_SEOER_CREATE,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_SEOER_DETAIL,
        },
      ],
    },
    {
      text: "Partner",
      link: ROUTERS.MANAGEMENT_PARTNER,
      children: [
        {
          text: null,
          link: ROUTERS.MANAGEMENT_PARTNER_CREATE,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_PARTNER_DETAIL,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_PARTNER_CONTENT,
        },
      ],
    },
    {
      text: "Domains",
      link: ROUTERS.MANAGEMENT_DOMAINS,
      children: [
        {
          text: null,
          link: ROUTERS.MANAGEMENT_DOMAINS_CREATE,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_DOMAINS_EDIT,
        },
      ],
    },
    {
      text: "Orders",
      link: ROUTERS.MANAGEMENT_ORDERS,
    },
    {
      text: "Services",
      link: ROUTERS.MANAGEMENT_SERVICES,
    },
  ];

  // Teams sidebar - only for Manager and Assistant
  const teamsSidebar = {
    text: "Teams",
    link: ROUTERS.MANAGEMENT_TEAMS,
    children: [
      {
        text: null,
        link: ROUTERS.MANAGEMENT_TEAMS_CREATE,
      },
      {
        text: null,
        link: ROUTERS.MANAGEMENT_TEAMS_EDIT,
      },
    ],
  };

  // Team Members sidebar - for Team Leaders and Vice Team Leaders
  const teamMembersSidebar = {
    text: "My Team",
    link: ROUTERS.MANAGEMENT_MY_TEAM,
  };

  // Limited sidebar for Team Leaders and Vice Team Leaders (only 3 pages)
  const teamLeaderSidebar = [
    teamMembersSidebar,
    {
      text: "Domains",
      link: ROUTERS.MANAGEMENT_DOMAINS,
      children: [
        {
          text: null,
          link: ROUTERS.MANAGEMENT_DOMAINS_CREATE,
        },
        {
          text: null,
          link: ROUTERS.MANAGEMENT_DOMAINS_EDIT,
        },
      ],
    },
    {
      text: "Orders",
      link: ROUTERS.MANAGEMENT_ORDERS,
    },
  ];

  const partnerSidebar = [
    {
      text: "Domains",
      link: ROUTERS.PARTNER_DOMAIN,
      activeKeys: ["partner-domain"],
    },
    {
      text: "Packages",
      link: ROUTERS.PARTNER_PACKAGES,
      activeKeys: ["partner-packages"],
    },
    {
      text: "Orders",
      link: ROUTERS.PARTNER_ORDER,
      activeKeys: ["partner-orders"],
    },
    {
      text: "Contents",
      link: ROUTERS.PARTNER_CONTENT,
      activeKeys: ["partner-content"],
    },
  ];

  const seoerSidebar = [
    {
      text: "Domain",
      link: ROUTERS.SEO_SERVICE_DOMAIN,
    },
    {
      text: "Packages",
      link: ROUTERS.SEO_SERVICE_PACK,
    },
    {
      text: "Contents",
      link: ROUTERS.SEO_SERVICE_CONTENT,
    },
    {
      text: "My Orders",
      link: ROUTERS.SEO_MY_ORDER,
    },
    {
      text: "My Domain",
      link: ROUTERS.SEO_DOMAIN,
    },
  ];

  const domainBuyerSidebar = [
    {
      text: "Domains",
      link: ROUTERS.MANAGEMENT_DOMAINS,
    },
    {
      text: "Domain order",
      link: ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST,
    },
  ];

  let sideBarItems: any = [];

  if (role === ADMIN_ROLE.SUPER_ADMIN) {
    sideBarItems = [
      {
        text: "Statistics",
        link: ROUTERS.MANAGEMENT_STATISTICS,
      },
      ...managerAndSuperAdminSidebar,
      teamsSidebar,
      teamMembersSidebar,
    ];
  } else if (role === ADMIN_ROLE.MANAGER) {
    sideBarItems = [
      ...managerAndSuperAdminSidebar,
      teamsSidebar,
      teamMembersSidebar,
    ];
  } else if (role === ADMIN_ROLE.ASSISTANT) {
    sideBarItems = [
      ...managerAndSuperAdminSidebar,
      teamsSidebar,
      teamMembersSidebar,
    ];
  } else if (
    [ADMIN_ROLE.VICE_TEAM_LEADER, ADMIN_ROLE.TEAM_LEADER].includes(role)
  ) {
    sideBarItems = teamLeaderSidebar; // Only 3 pages: domains, orders, team members
  } else if (role === ADMIN_ROLE.PARTNER) {
    sideBarItems = partnerSidebar;
  } else if (role === ADMIN_ROLE.SEOER) {
    sideBarItems = seoerSidebar;
  } else if (role === ADMIN_ROLE.DOMAIN_BUYER) {
    sideBarItems = domainBuyerSidebar;
  }

  return [...sideBarItems];
};
