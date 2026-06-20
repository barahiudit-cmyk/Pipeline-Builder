import {
  Upload, Bot, Download, Type,
  Filter, Calculator, Globe, Clock, GitBranch, Mail, Webhook,
} from 'lucide-react';
import { getTextColor } from './nodeColors';

const Icon = ({ Component, type }) => (
  <Component size={14} className={getTextColor(type)} />
);

export const coreNodes = [
  { type: 'customInput',  label: 'Input',  icon: <Icon Component={Upload}   type="customInput" /> },
  { type: 'llm',          label: 'LLM',    icon: <Icon Component={Bot}      type="llm" /> },
  { type: 'customOutput', label: 'Output', icon: <Icon Component={Download} type="customOutput" /> },
  { type: 'text',         label: 'Text',   icon: <Icon Component={Type}     type="text" /> },
];

export const utilityNodes = [
  { type: 'filter',      label: 'Filter',      icon: <Icon Component={Filter}     type="filter" /> },
  { type: 'math',        label: 'Math',        icon: <Icon Component={Calculator} type="math" /> },
  { type: 'api',         label: 'API',         icon: <Icon Component={Globe}      type="api" /> },
  { type: 'delay',       label: 'Delay',       icon: <Icon Component={Clock}      type="delay" /> },
  { type: 'conditional', label: 'Conditional', icon: <Icon Component={GitBranch}  type="conditional" /> },
  { type: 'email',       label: 'Email',       icon: <Icon Component={Mail}       type="email" /> },
  { type: 'webhook',     label: 'Webhook',     icon: <Icon Component={Webhook}    type="webhook" /> },
];