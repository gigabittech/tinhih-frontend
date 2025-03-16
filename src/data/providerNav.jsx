import {
  LayoutDashboard,
  CalendarCheck,
  Inbox,
  UsersRound,
  BriefcaseBusiness,
  BookUser,
  LayoutList,
  Settings,
  UserRoundPen,
  Trash,
  CircleDollarSign,
  CopyPlus,
  Workflow,
} from "lucide-react";

const providerNav = [
  {
    label: "Calendar",
    path: "/provider/calendar",
    icon: <CalendarCheck />,
  },
  {
    label: "Inbox",
    path: "/provider/inbox",
    icon: <Inbox />,
  },
  {
    label: "Clients",
    path: "/provider/clients",
    icon: <UsersRound />,
  },
  {
    label: "Billings",
    path: "/provider/billings",
    icon: <CircleDollarSign />,
  },
  {
    label: "Your team",
    path: "/provider/team",
    icon: <BriefcaseBusiness />,
  },
  {
    label: "Contacts",
    path: "/provider/contacts",
    icon: <BookUser />,
  },
  {
    id: 1,
    label: "Templates",
    path: "/provider/templates",
    icon: <LayoutList />,
    subMenu: [],
  },
  {
    id: 2,
    label: "Settings",
    path: "/provider/settings",
    icon: <Settings />,
    subMenu: [
      {
        label: "My Profile",
        subLabel: "Your personal details",
        path: "/provider/settings/personal/details",
        icon: <UserRoundPen />,
      },
      {
        label: "Workspace Settings",
        subLabel: "Subscription and workspace info",
        path: "/provider/settings/workspace/details",
        icon: <Workflow />,
      },
      {
        label: "Billing and Payments",
        subLabel: "Billing info, invoices, and stripe",
        path: "/provider/settings/billing/details",
        icon: <CircleDollarSign />,
      },
      {
        label: "Scheduling",
        subLabel: "Services details and bookings",
        path: "/provider/settings/scheduling/locations",
        icon: <CopyPlus />,
      },
      {
        label: "Trash",
        subLabel: "Restore deleted items",
        path: "/provider/trash",
        icon: <Trash />,
      },
    ],
  },
];

export default providerNav;
