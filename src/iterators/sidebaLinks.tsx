import { TableOutlined, InsertRowBelowOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

export interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  link: string;
  icon?: string | React.ReactNode;
  children?: MenuItem[];
  hasChildren?: boolean;
  disabled?: boolean;
  requiresAdmin?: boolean;
}

export const SidebarLinks: MenuItem[] = [
  {
    key: '/',
    label: 'Dashboard',
    link: '/',
    icon: <InsertRowBelowOutlined />,
  }, 
  {
    key: '/entity',
    label: 'Entity',
    link: '/entity',
    icon: <TableOutlined />,
  },
];

export default SidebarLinks;
