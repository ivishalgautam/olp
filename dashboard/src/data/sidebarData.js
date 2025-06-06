import { IoStatsChartOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { GoTag } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { PiUsersFour } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import { TbUserQuestion } from "react-icons/tb";
import { NotebookPen } from "lucide-react";

// Define the roles for each user type
const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const AllRoutes = [
  {
    label: "Dashboard",
    link: "/",
    icon: IoStatsChartOutline,
    roles: [ROLES.ADMIN, ROLES.USER],
  },
  {
    label: "Products",
    link: "/products",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/create",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/[id]/edit",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/[id]/view",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/[id]/edit",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/[id]/view",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Brands",
    link: "/brands",
    icon: GoTag,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs/create",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs/edit/[id]",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Customers",
    link: "/customers",
    icon: PiUsersFour,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Customers",
    link: "/customers/create",
    icon: PiUsersFour,
    roles: [ROLES.ADMIN],
  },
  // {
  //   label: "Customers",
  //   link: "/customers/import",
  //   icon: PiUsersFour,
  //   roles: [ROLES.ADMIN],
  // },
  {
    label: "Customers",
    link: "/customers/[id]/edit",
    icon: PiUsersFour,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Customers",
    link: "/customers/[id]/view",
    icon: PiUsersFour,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Enquiries",
    link: "/enquiries",
    icon: FaRegQuestionCircle,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Enquiries",
    link: "/enquiries/[id]",
    icon: FaRegQuestionCircle,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Orders",
    link: "/orders",
    icon: GoChecklist,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Orders",
    link: "/orders/create",
    icon: GoChecklist,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Orders",
    link: "/orders/[id]",
    icon: GoChecklist,
    roles: [ROLES.ADMIN],
  },
  {
    label: "All",
    link: "/all",
    icon: PiUsersFour,
    roles: [ROLES.USER],
  },
  {
    label: "Cart",
    link: "/cart",
    icon: PiUsersFour,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Queries",
    link: "/queries",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Queries",
    link: "/queries/[id]",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Registrations",
    link: "/registrations",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Registrations",
    link: "/registrations/[id]",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
];
