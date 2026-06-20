//webhookNode.js
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

// webhook node - sends payload to a url when triggered
export const WebhookNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="webhook"
      title="Webhook"
      icon="🪝"
      fields={[
        {
          name: 'url',
          label: 'Webhook URL',
          type: 'text',
          defaultValue: 'https://hook.example.com',
        },
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          options: ['POST', 'PUT', 'PATCH'],
          defaultValue: 'POST',
        },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'payload' },
        { type: 'source', position: Position.Right, id: 'response' },
      ]}
    />
  );
};