export type ClientRecord = {
  id: string;
  name: string;
  status: 'Active' | 'Onboarding' | 'Paused';
  team: string;
};

export const sampleClients: ClientRecord[] = [
  { id: 'CPSM-1001', name: 'Sample Client Alpha', status: 'Active', team: 'Implementation' },
  { id: 'CPSM-1002', name: 'Sample Client Beta', status: 'Active', team: 'Data Services' },
  { id: 'CPSM-1003', name: 'Sample Client Gamma', status: 'Onboarding', team: 'Project Management' },
];

export function clientDashboardPath(clientId: string) {
  return `/client-portal?clientId=${encodeURIComponent(clientId)}`;
}
